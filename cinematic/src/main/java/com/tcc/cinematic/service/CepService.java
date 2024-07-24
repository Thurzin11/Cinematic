package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.ResponseCepDTO;
import com.tcc.cinematic.config.ViaCepWebClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class CepService {
    @Autowired
    private ViaCepWebClient webClient;

    public ResponseCepDTO findCep(String cep) {
        return this.webClient.findCep(cep);
    }
}
