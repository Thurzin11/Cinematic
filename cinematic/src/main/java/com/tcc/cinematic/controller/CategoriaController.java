package com.tcc.cinematic.controller;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService service;

    @GetMapping
    public ResponseEntity<List<Categoria>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> findById(@PathVariable UUID id) {
        var categoriaFound = this.service.findById(id);
        if(categoriaFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(categoriaFound);
    }

    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody @Valid Categoria categoria) {
        var categoriaFound = this.service.create(categoria);
        return new ResponseEntity(categoriaFound, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Categoria> update(@RequestBody @Valid Categoria categoria) {
        var categoriaFound = this.service.update(categoria);
        if(categoriaFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(categoriaFound);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var returnDelete = this.service.delete(id);
        if(!returnDelete)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
