package com.tcc.cinematic.config;

import com.tcc.cinematic.DTO.EstadoDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.util.List;

@Component
public class IBGEWebClient {
    private final String urlEstados;
    private final String urlCidades;
    private WebClient webClient;

    public IBGEWebClient(WebClient webClient, IBGEConfiguration ibgeConfiguration) {
        this.webClient = webClient;
        this.urlEstados = ibgeConfiguration.getUrlEstados();
        this.urlCidades = ibgeConfiguration.getUrlCidades();
    }

    public Flux<EstadoDTO> findEstados() {
        Flux<EstadoDTO> response = webClient
                .get()
                .uri(this.urlEstados)
                .retrieve()
                .bodyToFlux(EstadoDTO.class);

        return response;
    }
}
