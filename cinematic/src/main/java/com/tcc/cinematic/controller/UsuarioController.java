package com.tcc.cinematic.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tcc.cinematic.DTO.FuncionarioRegisterDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.service.UsuarioService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);
    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll(){
        return ResponseEntity.ok(this.service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable UUID id){
        var userReturn = this.service.findById(id);
        if (userReturn == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(userReturn);
    }

    @GetMapping("/funcionarios")
    public ResponseEntity<Stream<FuncionarioRegisterDTO>> findByGerenteAndFuncionario(){
       return ResponseEntity.ok(this.service.findByGerenteAndFuncionario());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Stream<FuncionarioRegisterDTO>> findByName(@PathVariable String nome){
        return ResponseEntity.ok(this.service.findByName(nome));
    }

    @PatchMapping("/funcionarios/inativar/{id}")
    public ResponseEntity<Usuario> inativarUsuario(@PathVariable UUID id){
        return ResponseEntity.ok(this.service.inativarUsuario(id));
    }
    @PatchMapping("/funcionarios/ativar/{id}")
    public ResponseEntity<Usuario> ativarUsuario(@PathVariable UUID id){
        return ResponseEntity.ok(this.service.ativarUsuario(id));
    }

    @PatchMapping("/filtros")
    public ResponseEntity<Stream<FuncionarioRegisterDTO>> filtros(@RequestBody Map<String,List<String>> map){
        return ResponseEntity.ok(this.service.findByFilters(map));
    }

    @PostMapping("/funcionario")
    public ResponseEntity<Usuario> create(@RequestBody @Valid FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user = this.service.createFuncionario(funcionarioRegisterDTO);
        return new ResponseEntity<Usuario>(user, HttpStatus.CREATED);
    }


    @PatchMapping
    public ResponseEntity<Usuario> update(@RequestBody @Valid FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user = this.service.update(funcionarioRegisterDTO);
        if (user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var isDelete = this.service.delete(id);
        if (!isDelete)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(isDelete);
    }
}
