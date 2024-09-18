package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.HorarioRegisterDTO;
import com.tcc.cinematic.entity.Horario;
import com.tcc.cinematic.service.HorarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/horario")
public class  HorarioController {

    @Autowired
    private HorarioService service;

    @GetMapping
    public ResponseEntity<List<Horario>> findAll(){return ResponseEntity.ok(this.service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> findById(@PathVariable UUID id){
        var horarioReturn = this.service.findById(id);
        if (horarioReturn == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(horarioReturn);
    }

    @PostMapping
    public ResponseEntity<Horario> create(@RequestBody @Valid HorarioRegisterDTO horarioDTO){
        var horarioReturn = this.service.create(horarioDTO);
        return new ResponseEntity(horarioReturn, HttpStatus.CREATED);
    }

    @PatchMapping("/filtro")
    public ResponseEntity<List<Horario>> filtro(@RequestBody Map<String,List<String>> filtro){
        return ResponseEntity.ok(this.service.filtro(filtro));
    }

    @PatchMapping
    public ResponseEntity<Horario> update(@RequestBody @Valid Horario horario){
        var horarioReturn = this.service.update(horario);
        if (horarioReturn == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(horarioReturn);
    }

    @PatchMapping("{id}/inativar")
    public ResponseEntity<Boolean> inativar(@PathVariable UUID id){
        var returnInativar = this.service.inativar(id);
        if (!returnInativar){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(true);
    }

    @PatchMapping("{id}/ativar")
    public ResponseEntity<Boolean> ativar(@PathVariable UUID id){
        var returnAtivar = this.service.ativar(id);
        if (!returnAtivar){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(true);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var isDelete = this.service.delete(id);
        if (!isDelete)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(isDelete);
    }
}
