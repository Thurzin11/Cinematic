package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.DTO.FilmeUpdateDTO;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.service.FilmeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/filme")
public class FilmeController {
    @Autowired
    private FilmeService service;

    @GetMapping
    public ResponseEntity<List<Filme>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/disponivel")
    public ResponseEntity<List<Filme>> findAllByDisponibilidade() {
        return ResponseEntity.ok(this.service.findAllByDisponibilidade());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> findById(@PathVariable UUID id) {
        var filmeFound = this.service.findById(id);
        if(filmeFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(filmeFound);
    }

    @PostMapping
    public ResponseEntity<Filme> create(@RequestBody @Valid FilmeRegisterDTO filmeRegisterDTO) {
        System.out.println(filmeRegisterDTO);
        return ResponseEntity.ok(this.service.create(filmeRegisterDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Filme> update(@RequestBody FilmeRegisterDTO filmeUpdateDTO, @PathVariable UUID id) {
        var filmeReturn = this.service.update(filmeUpdateDTO, id);
        if(filmeReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(filmeReturn);
    }

    @PatchMapping("/filtro")
    public ResponseEntity<List<Filme>> filter(@RequestBody Map<String, List<String>> filter) {
        return ResponseEntity.ok(this.service.filters(filter));
    }

    @PatchMapping("/nome")
    public ResponseEntity<List<Filme>> findByNomeIlike(@RequestBody String nome) {
        return ResponseEntity.ok(this.service.findByNomeIlike(nome));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Boolean> inativar(@PathVariable UUID id) {
        var returnInativar = this.service.inativar(id);
        if(!returnInativar)
            return ResponseEntity.badRequest().body(false);

        return ResponseEntity.ok(true);
    }

    @PatchMapping("{id}/ativar")
    public ResponseEntity<Boolean> ativar(@PathVariable UUID id) {
        var returnAtivar = this.service.ativar(id);
        if(!returnAtivar)
            return ResponseEntity.badRequest().body(false);

        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var deleteReturn = this.service.delete(id);
        if(!deleteReturn)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
