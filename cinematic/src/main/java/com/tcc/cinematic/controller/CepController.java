package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.ResponseCepDTO;
import com.tcc.cinematic.service.CepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Map;

@RestController
@RequestMapping("/viacep")
public class CepController {
    @Autowired
    private CepService service;

    @GetMapping
    public ResponseEntity<ResponseCepDTO> findCep(@RequestBody Map<String, String> params) {
        return ResponseEntity.ok(this.service.findCep(params.get("cep")));
    }
}
