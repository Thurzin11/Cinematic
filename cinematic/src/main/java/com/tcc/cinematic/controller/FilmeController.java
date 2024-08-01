package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.DTO.FilmeUpdateDTO;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.service.FilmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/{id}")
    public ResponseEntity<Filme> findById(@PathVariable UUID id) {
        var filmeFound = this.service.findById(id);
        if(filmeFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(filmeFound);
    }

    @PostMapping
    public ResponseEntity<Filme> create(@RequestBody FilmeRegisterDTO filmeRegisterDTO) {
        return ResponseEntity.ok(this.service.create(filmeRegisterDTO));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Filme> update(@RequestBody FilmeUpdateDTO filmeUpdateDTO, @PathVariable UUID id) {
        var filmeReturn = this.service.update(filmeUpdateDTO, id);
        if(filmeReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(filmeReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var deleteReturn = this.service.delete(id);
        if(!deleteReturn)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
