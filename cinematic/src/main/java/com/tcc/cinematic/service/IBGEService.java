package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.ResponseCidadeDTO;
import com.tcc.cinematic.DTO.ResponseEstadoDTO;
import com.tcc.cinematic.config.IBGEWebClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class IBGEService {
    @Autowired
    private IBGEWebClient webClient;

    public Flux<ResponseEstadoDTO> findEstados() {
        return this.webClient.findEstados();
    }

    public Flux<ResponseCidadeDTO> findCidades(String uf) {
        return this.webClient.findCidadesPerEstado(uf);
    }
}
