package com.tcc.cinematic.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@Getter
public class IBGEConfiguration {
    @Value("${ibge.base-url}")
    private String urlBase;
    @Value("${ibge.estados}")
    private String estados;
    @Value("${ibge.estados.cidades}")
    private String cidades;
}
