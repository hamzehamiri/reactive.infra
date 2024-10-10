package org.infra.reactive.web.formengine.modules.process.services;

import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.table.CoreTableDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.window.tab.RecordModelDTO;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOForm;
import org.infra.reactive.form.engine.form.engine.services.core.dto.CoreServiceDTOTable;
import org.infra.reactive.form.engine.form.engine.services.core.process.AbstractProcessCall;
import org.infra.reactive.form.engine.form.engine.services.core.process.AbstractProcessCallStateEnum;
import org.infra.reactive.form.engine.form.engine.services.core.process.ProcessClassRegister;
import org.infra.reactive.web.formengine.configuration.CoreServiceConfig;
import reactor.core.publisher.Flux;
import reactor.core.publisher.SynchronousSink;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@ProcessClassRegister(serverRegisterKey = "generate_physical_table")
public class GeneratePhysicalTableProcess extends AbstractProcessCall {

    @Override
    public Flux<CoreProcessResponseDTO> executeProcess() {
        CoreServiceDTOForm coreServiceDTOFormInstance = CoreServiceConfig.applicationContext.getBean(CoreServiceDTOForm.class);

        CoreProcessResponseDTO coreProcessResponseDTO = new CoreProcessResponseDTO();
        coreProcessResponseDTO.setTaskComplete(0L);
        coreProcessResponseDTO.setId(10L);
        coreProcessResponseDTO.setTotalEstimate(100L);
        coreProcessResponseDTO.setDateTime(LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));

        List<CoreTableDTO> coreTableDTOList = new ArrayList<>();
        List<Flux<CoreProcessResponseDTO>> fluxList = new ArrayList<>();

        int taskCount = 0;

        for (RecordModelDTO recordModelDTO : coreProcessRequestDTO.getRecordModelDTOList()) {
            for (Map.Entry<Long, Serializable> longSerializableEntry : recordModelDTO.getPkFieldValues().entrySet()) {
                Optional<CoreTableDTO> coreTableDTOOptional = CoreServiceDTOTable.coreTableDTOLRUCache.get(longSerializableEntry.getKey());
                if (coreTableDTOOptional.isPresent()) {
                    CoreTableDTO coreTableDTO = coreTableDTOOptional.get();
                    coreTableDTOList.add(coreTableDTO);

                    taskCount += coreTableDTO.getColumns().size() + coreTableDTO.getPkColumns().size() + 1;
                    fluxList.add(coreServiceDTOFormInstance.processTableDDL(coreTableDTO));
                }
            }
        }

        coreProcessResponseDTO.setTotalEstimate((long) taskCount);


        return Flux.merge(fluxList.toArray(new Flux[0]));

//        return Flux.generate(() -> 0, (state, sink) -> {
//            if (state == 0) {
//                coreProcessResponseDTO.setBodyResponse("Start");
//            } else {
//                coreProcessResponseDTO.setBodyResponse("Processing");
//            }
//
//            coreProcessResponseDTO.setTaskComplete((long) (state + 1));
//            coreProcessResponseDTO.setDateTime(LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault()));
//
//
//            coreServiceDTOFormInstance.createDDLColumn(null, new CoreTableColumnDTO())
//                    .subscribeOn(Schedulers.boundedElastic())
//                    .doOnNext(value -> {
//                        System.out.println("Received from another Flux: " + value);
//                        sink.complete();
//                    })
//                    .take(1)
//                    .subscribe(coreProcessResponseDTO1 -> {
//                        sink.next(coreProcessResponseDTO1);
//                    });
//
////            sink.next(coreProcessResponseDTO);
//
//            checkAliveProcess(sink, coreProcessResponseDTO);
//            if (Objects.equals(coreProcessResponseDTO.getTotalEstimate(), coreProcessResponseDTO.getTaskComplete())) {
//                coreProcessResponseDTO.setBodyResponse("Complete");
//                sink.complete();
//            }
//            return state + 1;
//        }).delayElements(Duration.ZERO).cast(CoreProcessResponseDTO.class);

//        return Flux.fromIterable(new CoreTableDDLServiceIterator(coreTableDTOList));

//        return Flux.create((FluxSink<CoreProcessResponseDTO> fluxSink) -> {
//            coreProcessResponseDTO.setTaskComplete(coreProcessResponseDTO.getTaskComplete() + 1);
//            fluxSink.next(coreProcessResponseDTO);
//
//            if (Objects.equals(coreProcessResponseDTO.getTotalEstimate(), coreProcessResponseDTO.getTaskComplete())) {
//                coreProcessResponseDTO.setBodyResponse("Complete");
//                fluxSink.complete();
//            }
//        }).delayElements(Duration.ZERO).cast(CoreProcessResponseDTO.class);
    }

    public void checkAliveProcess(SynchronousSink<Object> sink, CoreProcessResponseDTO coreProcessResponseDTO) {
        if (abstractProcessCallStateEnum == AbstractProcessCallStateEnum.Dead) {
            sink.next(coreProcessResponseDTO);
            sink.complete();
        }
    }
}
