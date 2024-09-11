package com.tcc.cinematic.controller;
import com.tcc.cinematic.DTO.FuncionarioRegisterDTO;
import com.tcc.cinematic.DTO.LoginFuncionarioDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.service.UsuarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

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
    public ResponseEntity<FuncionarioRegisterDTO> findById(@PathVariable UUID id){
        var userReturn = this.service.findById(id);
        if (userReturn == null)
            return ResponseEntity.notFound().build();
        var userReturnDTO = this.service.convertToDTO(userReturn);
        return ResponseEntity.ok(userReturnDTO);
    }

    @GetMapping("/funcionarios")
    public ResponseEntity<Stream<FuncionarioRegisterDTO>> findByGerenteAndFuncionario(){
        Stream<Usuario> usuarios = this.service.findByGerenteAndFuncionario();
        return ResponseEntity.ok(this.service.convertToDTOStream(usuarios));
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
    public ResponseEntity<FuncionarioRegisterDTO> create(@RequestBody @Valid FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user = this.service.createFuncionario(funcionarioRegisterDTO);
        return new ResponseEntity<FuncionarioRegisterDTO>(this.service.convertToDTO(user), HttpStatus.CREATED);
    }


    @PatchMapping
    public ResponseEntity<FuncionarioRegisterDTO> update(@RequestBody @Valid FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user = this.service.update(funcionarioRegisterDTO);
        if (user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(this.service.convertToDTO(user));
    }

    @PatchMapping("/login/funcionario")
    public ResponseEntity<FuncionarioRegisterDTO> login(@RequestBody @Valid LoginFuncionarioDTO dto){
        var userLogin = this.service.loginFuncionario(dto);
        if (userLogin == null){
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(this.service.convertToDTO(userLogin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id){
        var isDelete = this.service.delete(id);
        if (!isDelete)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(isDelete);
    }
}
