package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.AssentoRecordDTO;
import com.tcc.cinematic.entity.Assento;
import com.tcc.cinematic.service.AssentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assento")
public class AssentoController {

    @Autowired
    private AssentoService service;

    @GetMapping
    public ResponseEntity<List<Assento>> findAll(){return ResponseEntity.ok(this.service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Assento> findById(@PathVariable UUID id){
        var assentoReturn = this.service.findById(id);
        if (assentoReturn == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(assentoReturn);
    }

    @PostMapping
    public ResponseEntity<Assento> create(@RequestBody @Valid AssentoRecordDTO assentoRecordDTO){
        var assentoReturn = this.service.create(assentoRecordDTO);
        return new ResponseEntity(assentoReturn, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Assento> update(@RequestBody @Valid AssentoRecordDTO assentoRecordDTO){
        var assentoReturn = this.service.update(assentoRecordDTO);
        if (assentoReturn == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(assentoReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var isDelete = this.service.delete(id);
        if (!isDelete)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(isDelete);
    }
}
