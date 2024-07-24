package com.tcc.cinematic.config;

import com.tcc.cinematic.DTO.ResponseCidadeDTO;
import com.tcc.cinematic.DTO.ResponseEstadoDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Component
public class IBGEWebClient {
    private String urlEstados;
    private String urlCidades;
    private WebClient webClient;

    public IBGEWebClient(WebClient webClient, IBGEConfiguration IBGEConfiguration) {
        this.webClient = webClient;
        this.urlEstados = IBGEConfiguration.getEstados();
        this.urlCidades = IBGEConfiguration.getCidades();
    }

    public Flux<ResponseEstadoDTO> findEstados() {
        return webClient
                .get()
                .uri(this.urlEstados)
                .retrieve()
                .bodyToFlux(ResponseEstadoDTO.class);
    }

    public Flux<ResponseCidadeDTO> findCidadesPerEstado(String uf) {
        return webClient
                .get()
                .uri(this.urlCidades, uf)
                .retrieve()
                .bodyToFlux(ResponseCidadeDTO.class);
    }
}
