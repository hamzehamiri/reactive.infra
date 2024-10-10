package org.infra.reactive.web.formengine.modules.process.services;

import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.services.core.process.AbstractProcessCall;
import org.infra.reactive.form.engine.form.engine.services.core.process.ProcessClassRegister;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.Objects;

@ProcessClassRegister(serverRegisterKey = "generate_date_time_table_records")
public class GenerateDateTimeTableRecordsProcessCall extends AbstractProcessCall {
    @Override
    public Flux<CoreProcessResponseDTO> executeProcess() {
        coreProcessRequestDTO.getRecordId();
        coreProcessRequestDTO.getCoreProcessParamValueMap();
        CoreProcessResponseDTO coreProcessResponseDTO = new CoreProcessResponseDTO();
        coreProcessResponseDTO.setTaskComplete(0L);
        coreProcessResponseDTO.setId(10L);
        coreProcessResponseDTO.setTotalEstimate(100L);
//        return Flux.create(fluxSink -> {
//            coreProcessResponseDTO.setTaskComplete(coreProcessResponseDTO.getTaskComplete() + 1);
//            fluxSink.next(coreProcessResponseDTO);
//        });
        return Flux.generate(() -> 0, (state, sink) -> {
            coreProcessResponseDTO.setTaskComplete((long) (state + 1));
            sink.next(coreProcessResponseDTO);
            if (Objects.equals(coreProcessResponseDTO.getTotalEstimate(), coreProcessResponseDTO.getTaskComplete())) {
                sink.complete();
            }
            return state + 1;
        }).delayElements(Duration.ofSeconds(1)).cast(CoreProcessResponseDTO.class);
//        return Flux.generate(() -> 0, (state, sink) -> {
//                    CoreProcessResponseDTO r1 = new CoreProcessResponseDTO();
//                    r1.setTaskComplete((long) (state + 1));
//                    r1.setId(10L);
//                    r1.setTotalEstimate(100L);
//                    sink.next(r1);
//                    return state + 1;
//                })
//                .delayElements(Duration.ofSeconds(1)).cast(CoreProcessResponseDTO.class);
    }
}
