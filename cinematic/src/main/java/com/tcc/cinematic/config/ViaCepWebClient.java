package com.tcc.cinematic.config;

import com.tcc.cinematic.DTO.ResponseCepDTO;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Component
public class ViaCepWebClient {
    private String urlCep;
    private WebClient webClient;

    public ViaCepWebClient(WebClient webClient, ViaCepConfiguration viaCepConfiguration) {
        this.webClient = webClient;
        this.urlCep = viaCepConfiguration.getCep();
    }

    public ResponseCepDTO findCep(String cep) {
        return webClient
                .method(HttpMethod.GET)
                .uri(this.urlCep, cep)
                .retrieve()
                .bodyToMono(ResponseCepDTO.class)
                .block();
    }
}
