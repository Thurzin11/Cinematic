package com.tcc.cinematic.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class BeanConfiguration {
    private String ibgeUrlBase;

    public BeanConfiguration(IBGEConfiguration IBGEConfiguration) {
        this.ibgeUrlBase = IBGEConfiguration.getUrlBase();
    }

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder.baseUrl(this.ibgeUrlBase)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
