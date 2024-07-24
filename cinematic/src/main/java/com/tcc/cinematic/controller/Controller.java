package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.ResponseCidadeDTO;
import com.tcc.cinematic.DTO.ResponseEstadoDTO;
import com.tcc.cinematic.service.IBGEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/ibge")
public class Controller {
    @Autowired
    private IBGEService service;

    @GetMapping("/estados")
    public ResponseEntity<Flux<ResponseEstadoDTO>> findEstados() {
        return ResponseEntity.ok(this.service.findEstados());
    }

    @GetMapping("/cidades/{uf}")
    public ResponseEntity<Flux<ResponseCidadeDTO>> findCidadesPerEstado(@PathVariable String uf) {
        return ResponseEntity.ok(this.service.findCidades(uf));
    }
}
