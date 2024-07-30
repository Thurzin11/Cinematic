package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.SessaoUpdateDTO;
import com.tcc.cinematic.entity.Sessao;
import com.tcc.cinematic.service.SessaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sessao")
public class SessaoController {
    @Autowired
    private SessaoService service;

    @GetMapping
    public ResponseEntity<List<Sessao>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> findById(@PathVariable UUID id) {
        var sessaoFound = this.service.findById(id);
        if(sessaoFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(sessaoFound);
    }

    @PostMapping
    public ResponseEntity<Sessao> create(@RequestBody @Valid Sessao sessao) {
        return new ResponseEntity(this.service.create(sessao), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Sessao> update(@RequestBody SessaoUpdateDTO sessaoUpdateDTO, @PathVariable UUID id) {
        var sessaoReturn = this.service.update(sessaoUpdateDTO, id);
        if(sessaoReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(sessaoReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var deleteReturn = this.service.delete(id);
        if(!deleteReturn)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
