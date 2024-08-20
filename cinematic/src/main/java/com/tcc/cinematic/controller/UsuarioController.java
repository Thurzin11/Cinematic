package com.tcc.cinematic.controller;

import com.tcc.cinematic.DTO.FuncionarioRegisterDTO;
import com.tcc.cinematic.DTO.UsuarioFilterParams;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import com.tcc.cinematic.service.UsuarioService;
import jakarta.validation.Valid;
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
    public ResponseEntity<List<Usuario>> findByGerenteAndFuncionario(){
       return ResponseEntity.ok(this.service.findByGerenteAndFuncionario());
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<Usuario>> findByName(@PathVariable String nome){
        return ResponseEntity.ok(this.service.findByName(nome));
    }

    @GetMapping("/filtros")
    public ResponseEntity<List<Usuario>> filtros(@RequestBody UsuarioFilterParams params){
        return ResponseEntity.ok(this.service.findByFilters(params));
    }

    @GetMapping("/email")
    public ResponseEntity<List<Usuario>> findByEmail(@RequestBody Map<String,String> map){
        var email = map.get("email");
        return ResponseEntity.ok(this.service.findByEmail(email));
    }

    @GetMapping("/status")
    public ResponseEntity<List<Usuario>> findByStatus(@RequestBody Map<String,Boolean> map){
        return ResponseEntity.ok(this.service.findByStatus(map.get("status")));
    }

    @GetMapping("/tipoUser")
    public ResponseEntity<List<Usuario>> findByTipoUsuario(@RequestBody Map<String,TipoUsuario> map){
        return ResponseEntity.ok(this.service.findByTipoUsuario(map.get("tipoUsuario")));
    }


    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody @Valid FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user = this.service.create(funcionarioRegisterDTO);
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
