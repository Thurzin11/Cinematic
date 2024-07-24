package com.tcc.cinematic.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@Getter
public class ViaCepConfiguration {
    @Value("${viacep.base-url}")
    private String urlBase;
    @Value("${viacep.cep}")
    private String cep;
}
