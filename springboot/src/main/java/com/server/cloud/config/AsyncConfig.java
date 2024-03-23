package com.server.cloud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    private int CORE_POOL_SIZE = 5;
    private int MAX_POOL_SIZE = 50;
    private int QUEUE_CAPACITY = 100;

    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(CORE_POOL_SIZE); // 쓰레드 풀의 기본 크기
        executor.setMaxPoolSize(MAX_POOL_SIZE); // 쓰레드 풀의 최대 크기
        executor.setQueueCapacity(QUEUE_CAPACITY); //대기열의 크기
        executor.setThreadNamePrefix("asyncUploads"); // 스레드의 접두어

        return executor;
    }
}
