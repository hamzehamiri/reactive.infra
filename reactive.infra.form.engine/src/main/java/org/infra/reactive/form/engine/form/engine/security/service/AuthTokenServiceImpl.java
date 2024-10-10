package org.infra.reactive.form.engine.form.engine.security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.CoreUserAuthenticateResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.role.CoreRoleDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.tenant.CoreTenantDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.security.user.CoreUserTenantDTO;
import org.infra.reactive.form.engine.form.engine.security.exception.AuthenticationException;
import org.infra.reactive.form.engine.form.engine.security.exception.InfraExceptionsConstant;
import org.infra.reactive.form.engine.form.engine.security.exception.InvalidUsernamePasswordException;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.entity.CoreServiceEntityTable;
import org.infra.reactive.form.engine.form.engine.utils.StringUtils;
import org.infra.reactive.form.engine.form.engine.utils.map.ConvertModelToMapUtil;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class AuthTokenServiceImpl {

    public final static String keySecret = "secret";
    public final static String keyClaim = "userInfo";
    public final static String keyHeader_Authorization = "Authorization";
    public final static String keyHeader_Sec_WebSocket_Protocol = "Sec-WebSocket-Protocol";
    public final static String keyWebSocket = "Upgrade";
    public final static String key_X_Authorization = "X-Authorization";
    public final static String mainPathSecurity = "security";
    public final static String loginSecurity = "login";
    public final static String key_Token = "token";
    public final static String key_UserAgent = "User-Agent";

    private final Algorithm algorithm;
    private final int expiresMinutes;
    private final CoreServiceDTOForm coreServiceDTOForm;

    public AuthTokenServiceImpl(String secret, int expiresMinutes, CoreServiceDTOForm coreServiceDTOForm) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.expiresMinutes = expiresMinutes;
        this.coreServiceDTOForm = coreServiceDTOForm;
    }

    public Mono<CoreUserAuthenticateResponseDTO> login(CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO) {
        return this.coreServiceDTOForm.login(coreUserAuthenticateRequestDTO).flatMap(coreUserAuthenticateResponseDTO -> {
            if (coreUserAuthenticateResponseDTO.getAllTenants().isEmpty()) {
                return Mono.error(new InvalidUsernamePasswordException());
            } else if (coreUserAuthenticateResponseDTO.getAllTenants().size() == 1) {
                if (coreUserAuthenticateRequestDTO.getRoles() != null && !coreUserAuthenticateRequestDTO.getRoles().isEmpty()) {
                    return sign(coreUserAuthenticateRequestDTO).map(token -> {
                        coreUserAuthenticateResponseDTO.setToken(token);
                        return coreUserAuthenticateResponseDTO;
                    });
                } else {
                    Mono<List<CoreRoleDTO>> coreRoleMetaDataDTO = this.coreServiceDTOForm.rolesPerUserTenant(coreUserAuthenticateResponseDTO.getAllTenants().get(0).getId(), coreUserAuthenticateRequestDTO);
                    return Mono.zip(coreRoleMetaDataDTO, Mono.just(coreUserAuthenticateResponseDTO)).flatMap(listCoreUserAuthenticateResponseDTOTuple2 -> {
                        CoreUserAuthenticateResponseDTO coreUserAuthenticateResponseDTO1 = listCoreUserAuthenticateResponseDTOTuple2.getT2();
                        coreUserAuthenticateResponseDTO1.setAllRoles(listCoreUserAuthenticateResponseDTOTuple2.getT1());
                        return Mono.just(coreUserAuthenticateResponseDTO1);
                    });
                }
            } else {
                return Mono.just(coreUserAuthenticateResponseDTO);
            }
        });
    }

    public Mono<String> sign(CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO) {
        return Mono.fromCallable(() -> {
            Map<String, Object> userMapForToken = ConvertModelToMapUtil.convert(coreUserAuthenticateRequestDTO);
            Instant issuedAt = Instant.now();
            Instant expiresAt = issuedAt.plus(Duration.ofMinutes(expiresMinutes));
            return JWT.create()
                    .withIssuedAt(Date.from(issuedAt))
                    .withExpiresAt(Date.from(expiresAt))
                    .withClaim(keyClaim, userMapForToken)
                    .sign(this.algorithm);
        });
    }

    public Mono<Map<String, Object>> verify(String token) {
        if (!StringUtils.hasText(token)) {
            return Mono.error(new AuthenticationException("Required token"));
        }
        return Mono.fromCallable(() -> {
            try {
                return JWT.require(this.algorithm)
                        .build()
                        .verify(token)
                        .getClaims()
                        .get(keyClaim)
                        .asMap();
            } catch (JWTVerificationException e) {
                throw new AuthenticationException(InfraExceptionsConstant.invalidToken);
            }
        });
    }

    public static void main(String[] args) {
        CoreRoleDTO role1 = new CoreRoleDTO();
        role1.setName("AdminRole");
        role1.setTranslate("AdminRoleTitle");

        CoreRoleDTO role2 = new CoreRoleDTO();
        role2.setName("SupportRole");
        role2.setTranslate("SupportRoleTitle");

        CoreTenantDTO coreTenantMetaDataDTO = new CoreTenantDTO();
        coreTenantMetaDataDTO.setName("Naftt");
        coreTenantMetaDataDTO.setId(1L);

        CoreUserTenantDTO coreUserTenantDTO = new CoreUserTenantDTO();
        coreUserTenantDTO.setId(1L);
        coreUserTenantDTO.setCoreTenantDTO(coreTenantMetaDataDTO);

        CoreUserAuthenticateRequestDTO coreUserAuthenticateRequestDTO = new CoreUserAuthenticateRequestDTO();
        coreUserAuthenticateRequestDTO.setUserName("hamzehamiri");
        coreUserAuthenticateRequestDTO.setPassword("hamzehamiri");
        coreUserAuthenticateRequestDTO.setTenant(coreUserTenantDTO);
        coreUserAuthenticateRequestDTO.setRoles(Arrays.asList(role1, role2));

        CoreServiceEntityTable coreServiceEntityTable = new CoreServiceEntityTable();
        CoreServiceDTOTable coreServiceDTOTable = new CoreServiceDTOTable(coreServiceEntityTable);
        CoreServiceDTOForm coreServiceDTOForm = new CoreServiceDTOForm(coreServiceDTOTable);
        AuthTokenServiceImpl authService = new AuthTokenServiceImpl(keySecret, 1, coreServiceDTOForm);

        Mono<String> monoToken = authService.sign(coreUserAuthenticateRequestDTO);
        monoToken.subscribe(s -> {
            System.out.println(s);
            Mono<Map<String, Object>> user = authService.verify(s);
            user.subscribe(stringObjectMap -> {
                System.out.println(stringObjectMap);
            });
        });
    }
}
