package org.infra.reactive.form.engine.form.engine.providers.dbs.common.common.rdbms;

import reactor.pool.PoolMetricsRecorder;

public class InfaPoolMetricsRecorder implements PoolMetricsRecorder {
    @Override
    public void recordAllocationSuccessAndLatency(long latencyMs) {
        System.out.println("recordAllocationSuccessAndLatency");
    }

    @Override
    public void recordAllocationFailureAndLatency(long latencyMs) {
        System.out.println("recordAllocationFailureAndLatency");
    }

    @Override
    public void recordResetLatency(long latencyMs) {
        System.out.println("recordResetLatency");
    }

    @Override
    public void recordDestroyLatency(long latencyMs) {
        System.out.println("recordDestroyLatency");
    }

    @Override
    public void recordRecycled() {
        System.out.println("recordRecycled");
    }

    @Override
    public void recordLifetimeDuration(long millisecondsSinceAllocation) {
        System.out.println("recordLifetimeDuration");
    }

    @Override
    public void recordIdleTime(long millisecondsIdle) {
        System.out.println("recordIdleTime");
    }

    @Override
    public void recordSlowPath() {
        System.out.println("recordSlowPath");
    }

    @Override
    public void recordFastPath() {
        System.out.println("recordFastPath");
    }
}
