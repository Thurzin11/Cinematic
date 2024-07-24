package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.TrailerRegisterDTO;
import com.tcc.cinematic.DTO.TrailerUpdateDTO;
import com.tcc.cinematic.entity.Trailer;
import com.tcc.cinematic.service.TrailerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/trailer")
public class TrailerController {
    @Autowired
    private TrailerService service;

    @GetMapping
    public ResponseEntity<List<Trailer>> findAll() {
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trailer> findById(@PathVariable UUID id) {
        var trailerReturn = this.service.findById(id);
        if(trailerReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(trailerReturn);
    }

    @PostMapping
    public ResponseEntity<Trailer> create(@RequestBody @Valid TrailerRegisterDTO trailerRegisterDTO) {
        var trailerReturn = this.service.create(trailerRegisterDTO);
        return new ResponseEntity(trailerReturn, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Trailer> update(@RequestBody @Valid TrailerUpdateDTO trailerUpdateDTO) {
        var trailerReturn = this.service.update(trailerUpdateDTO);
        if(trailerReturn == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(trailerReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        var returnDelete = this.service.delete(id);
        if(!returnDelete)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(true);
    }
}
