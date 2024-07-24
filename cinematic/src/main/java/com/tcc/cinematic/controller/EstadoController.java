package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.EstadoDTO;
import com.tcc.cinematic.service.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/estado")
public class EstadoController {
    @Autowired
    private EstadoService service;

    @GetMapping
    public ResponseEntity<Flux<EstadoDTO>> findEstados() {
        return ResponseEntity.ok(this.service.findEstados());
    }
}
