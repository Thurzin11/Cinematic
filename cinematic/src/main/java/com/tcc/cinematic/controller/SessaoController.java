package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.SessaoRecordDTO;
import com.tcc.cinematic.entity.Sessao;
import com.tcc.cinematic.service.SessaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
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
    public ResponseEntity<Sessao> create(@RequestBody @Valid SessaoRecordDTO sessao) {
        return new ResponseEntity<Sessao>(this.service.create(sessao), HttpStatus.CREATED);
    }

    @PatchMapping("/filtro")
    public ResponseEntity<List<Sessao>> filter(@RequestBody Map<String, List<String>> filterMap) {
        return ResponseEntity.ok(this.service.filters(filterMap));
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<Boolean> inativar(@PathVariable UUID id) {
        var returnInativar = this.service.inativar(id);
        if(!returnInativar)
            return ResponseEntity.badRequest().body(false);

        return ResponseEntity.ok(true);
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<Boolean> ativar(@PathVariable UUID id) {
        var returnAtivar = this.service.ativar(id);
        if(!returnAtivar)
            return ResponseEntity.badRequest().body(false);

        return ResponseEntity.ok(true);
    }

    @PatchMapping
    public ResponseEntity<Sessao> update(@RequestBody @Valid SessaoRecordDTO sessaoRecordDTO) {
        var sessaoReturn = this.service.update(sessaoRecordDTO);
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
