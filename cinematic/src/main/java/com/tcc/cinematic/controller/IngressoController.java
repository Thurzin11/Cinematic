package com.tcc.cinematic.controller;

import com.tcc.cinematic.entity.Ingresso;
import com.tcc.cinematic.service.IngressoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ingresso")
public class IngressoController {

    @Autowired
    private IngressoService service;

    @GetMapping
    public ResponseEntity<List<Ingresso>> findAll(){
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingresso> findById(@PathVariable UUID id){
        var ingressoFound = this.service.findById(id);
        if (ingressoFound == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(ingressoFound);
    }

    @PatchMapping()
    public ResponseEntity<Ingresso> edit(@RequestBody Ingresso ingresso){
        var ingressoReturn = this.service.edit(ingresso);
        if (ingressoReturn == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(ingressoReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var retorno = this.service.delete(id);
        if (retorno == false)
            ResponseEntity.badRequest().build();

        return ResponseEntity.ok(retorno);
    }
}
