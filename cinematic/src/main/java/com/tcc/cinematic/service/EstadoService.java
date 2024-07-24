package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.EstadoDTO;
import com.tcc.cinematic.config.IBGEWebClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class EstadoService {
    @Autowired
    private IBGEWebClient webClient;

    public Flux<EstadoDTO> findEstados() {
        return this.webClient.findEstados();
    }
}
