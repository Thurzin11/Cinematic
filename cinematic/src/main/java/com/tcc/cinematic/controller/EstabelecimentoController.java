package com.tcc.cinematic.controller;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.service.EstabelecimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoController {
    @Autowired
    private EstabelecimentoService service;

    @GetMapping
    public ResponseEntity<List<Estabelecimento>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estabelecimento> findById(@PathVariable UUID id) {
        var estabelecimentoFound = this.service.findById(id);
        if(estabelecimentoFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(estabelecimentoFound);
    }

    @PostMapping
    public ResponseEntity<Estabelecimento> create(@RequestBody Estabelecimento estabelecimento) {
        return ResponseEntity.ok(this.service.create(estabelecimento));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Estabelecimento>> findByNome(@PathVariable String nome){
        return ResponseEntity.ok(this.service.findByNome(nome));
    }


    @PatchMapping
    public ResponseEntity<Estabelecimento> update(@RequestBody Estabelecimento estabelecimento) {
        var estabelecimentoReturn = this.service.update(estabelecimento);
        if(estabelecimento == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(estabelecimentoReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var deleteReturn = this.service.delete(id);
        if(!deleteReturn)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
