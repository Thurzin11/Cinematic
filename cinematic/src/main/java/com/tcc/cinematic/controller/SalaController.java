package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.SalaRecordDTO;
import com.tcc.cinematic.entity.Sala;
import com.tcc.cinematic.service.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sala")
public class SalaController {
    @Autowired
    private SalaService service;

    @GetMapping
    public ResponseEntity<List<Sala>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sala> findById(@PathVariable UUID id) {
        var salaFound = this.service.findById(id);
        if(salaFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(salaFound);
    }

    @PostMapping
    public ResponseEntity<Sala> create(@RequestBody SalaRecordDTO salaRecordDTO) {
        return new ResponseEntity(this.service.create(salaRecordDTO), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Sala> update(@RequestBody SalaRecordDTO salaRecordDTO) {
        var salaReturn = this.service.update(salaRecordDTO);
        if(salaReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(salaReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var deleteReturn = this.service.delete(id);
        if(!deleteReturn)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
