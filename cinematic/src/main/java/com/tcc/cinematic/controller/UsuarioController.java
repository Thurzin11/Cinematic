package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.UsuarioRegisterDTO;
import com.tcc.cinematic.DTO.UsuarioUpdateDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import com.tcc.cinematic.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll(){
        return ResponseEntity.ok(this.service.finAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable UUID id){
        var userReturn = this.service.findById(id);
        if (userReturn == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(userReturn);
    }

    @GetMapping("/funcionario")
    public ResponseEntity<List<Usuario>> findByNomeAndTipoUsuario(@RequestBody Map<String,String> params){
        var retorno = this.service.findByNomeAndTipoUsuario(params.get("nome"),params.get("tipo"));
        if (retorno == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(retorno);
    }

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody @Valid UsuarioRegisterDTO usuarioRegisterDTO){
        var userReturn = this.service.create(usuarioRegisterDTO);
        return new ResponseEntity(userReturn, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Usuario> update(@RequestBody @Valid UsuarioUpdateDTO usuarioUpdateDTO){
        var userReturn = this.service.update(usuarioUpdateDTO);
        if (userReturn == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(userReturn);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var isDelete = this.service.delete(id);
        if (!isDelete)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(isDelete);
    }

}
