package org.infra.reactive.form.engine.form.engine.services.core.process;

import lombok.Getter;
import lombok.Setter;
import org.infra.reactive.form.engine.form.engine.model.dto.request.CoreUserAuthenticateRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.request.process.CoreProcessRequestDTO;
import org.infra.reactive.form.engine.form.engine.model.dto.response.process.CoreProcessResponseDTO;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.concurrent.locks.ReentrantLock;

@Setter
public abstract class AbstractProcessCall {

    @Setter
    @Getter
    protected String uuid;
    protected CoreProcessRequestDTO coreProcessRequestDTO;
    protected CoreUserAuthenticateRequestDTO userSecurity;
    protected AbstractProcessCallStateEnum abstractProcessCallStateEnum;
    protected ReentrantLock reentrantLock;

    public AbstractProcessCall() {
        reentrantLock = new ReentrantLock(true);
    }

    private void simulateLockStarvation() {
        new Thread(() -> {
            while (abstractProcessCallStateEnum != AbstractProcessCallStateEnum.Complete) {
                blocked();
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                resume();
            }
        }).start();
    }

    public void blocked() {
        abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Blocked;
        try {
            reentrantLock.lock();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void resume() {
        abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Running;
        try {
            if (reentrantLock.isLocked())
                reentrantLock.unlock();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void terminate() {
        abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Dead;
        try {
            if (reentrantLock.isLocked())
                reentrantLock.unlock();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Flux<CoreProcessResponseDTO> executeControllerProxyProcess() {
        abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Running;
//        return Flux.zip(executeProcess() , Flux.just(new CoreProcessResponseDTO())).flatMap(objects -> {
//           return  Flux.just(objects.getT2());
//        });
        return executeProcess()
                .doOnNext(coreProcessResponseDTO -> {
                    reentrantLock.lock();
                    System.out.println("Do On Next");
                    reentrantLock.unlock();
                })
                .doOnEach(coreProcessResponseDTOSignal -> {
                    System.out.println("Do On Each");
                })
                .doOnComplete(() -> {
                    System.out.println("Complete");
                    abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Complete;
                }).doFinally(signalType -> {
                    System.out.println("Finally");
                    abstractProcessCallStateEnum = AbstractProcessCallStateEnum.Complete;
                    ProcessServiceRegistry.getInstance().removeProcessInstance(coreProcessRequestDTO);
                }).sample(Duration.ZERO);
    }

    public abstract Flux<CoreProcessResponseDTO> executeProcess();
}
