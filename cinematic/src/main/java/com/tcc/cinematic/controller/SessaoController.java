package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.SessaoUpdateDTO;
import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.entity.Horario;
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

    @GetMapping("/horario")
    public ResponseEntity<List<Sessao>> findByHorarioBetween(@RequestBody Map<String, Horario> params) {
        return ResponseEntity.ok(this.service.findByHorarioBetween(params.get("horarioInicial"), params.get("horarioFinal")));
    }

    @GetMapping("/filme")
    public ResponseEntity<List<Sessao>> findByFilme(@RequestBody Filme filme) {
        return ResponseEntity.ok(this.service.findByFilme(filme));
    }

    @GetMapping("/disponibilidade")
    public ResponseEntity<List<Sessao>> findByDisponibilidade() {
        return ResponseEntity.ok(this.service.findByDisponibilidade());
    }

    @GetMapping("/idioma")
    public ResponseEntity<List<Sessao>> findByIdioma(@RequestBody Map<String, String> params) {
        return ResponseEntity.ok(this.service.findByIdioma(params.get("idioma")));
    }

    @GetMapping("/tipo")
    public ResponseEntity<List<Sessao>> findByTipo(@RequestBody Map<String, String> params) {
        return ResponseEntity.ok(this.service.findByTipo(params.get("tipo")));
    }

    @GetMapping("/estabelecimento")
    public ResponseEntity<List<Sessao>> findByEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
        return ResponseEntity.ok(this.service.findByEstabelecimento(estabelecimento));
    }

    @GetMapping("/data")
    public ResponseEntity<List<Sessao>> findByData(@RequestBody Map<String, LocalDate> params) {
        return ResponseEntity.ok(this.service.findByData(params.get("data")));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sessao> findById(@PathVariable UUID id) {
        var sessaoFound = this.service.findById(id);
        if(sessaoFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(sessaoFound);
    }

    @PostMapping
    public ResponseEntity<Sessao> create(@RequestBody @Valid SessaoUpdateDTO sessao) {
        return new ResponseEntity<Sessao>(this.service.create(sessao), HttpStatus.CREATED);
    }

    @PatchMapping("/filtro")
    public ResponseEntity<List<Sessao>> filter(@RequestBody Map<String, List<String>> filterMap) {
        System.out.println(filterMap);
        return ResponseEntity.ok(this.service.filters(filterMap));
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
