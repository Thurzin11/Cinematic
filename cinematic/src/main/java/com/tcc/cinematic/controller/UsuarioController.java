package com.tcc.cinematic.controller;
import com.tcc.cinematic.DTO.ClientRegisterDTO;
import com.tcc.cinematic.DTO.LoginClientDTO;
import com.tcc.cinematic.DTO.UsuarioResponseDTO;
import com.tcc.cinematic.DTO.LoginFuncionarioDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.service.UsuarioService;
import jakarta.validation.Valid;
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
    public ResponseEntity<UsuarioResponseDTO> findById(@PathVariable UUID id){
        var userReturn = this.service.findById(id);
        if (userReturn == null)
            return ResponseEntity.notFound().build();
        var userReturnDTO = this.service.convertToDTO(userReturn);
        return ResponseEntity.ok(userReturnDTO);
    }

    @GetMapping("/funcionarios")
    public ResponseEntity<Stream<UsuarioResponseDTO>> findByGerenteAndFuncionario(){
        Stream<Usuario> usuarios = this.service.findByGerenteAndFuncionario();
        return ResponseEntity.ok(this.service.convertToDTOStream(usuarios));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<Stream<UsuarioResponseDTO>> findByName(@PathVariable String nome){
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
    public ResponseEntity<Stream<UsuarioResponseDTO>> filtros(@RequestBody Map<String,List<String>> map){
        return ResponseEntity.ok(this.service.findByFilters(map));
    }

    @PostMapping("/funcionario")
    public ResponseEntity<UsuarioResponseDTO> create(@RequestBody @Valid UsuarioResponseDTO usuarioResponseDTO){
        var user = this.service.createFuncionario(usuarioResponseDTO);
        return new ResponseEntity<UsuarioResponseDTO>(this.service.convertToDTO(user), HttpStatus.CREATED);
    }

    @PostMapping("/cliente")
    public ResponseEntity<UsuarioResponseDTO> createClient(@RequestBody @Valid ClientRegisterDTO dto){
        var user = this.service.createClient(dto);
        return new ResponseEntity<UsuarioResponseDTO>(this.service.convertToDTO(user), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<UsuarioResponseDTO> update(@RequestBody @Valid UsuarioResponseDTO usuarioResponseDTO){
        var user = this.service.update(usuarioResponseDTO);
        if (user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(this.service.convertToDTO(user));
    }

    @PatchMapping("/login/funcionario")
    public ResponseEntity<UsuarioResponseDTO> loginFuncionario(@RequestBody @Valid LoginFuncionarioDTO dto){
        var userLogin = this.service.loginFuncionario(dto);
        if (userLogin == null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(this.service.convertToDTO(userLogin));
    }
    @PatchMapping("/login/client")
    public ResponseEntity<UsuarioResponseDTO> loginClient(@RequestBody @Valid LoginClientDTO dto){
        var userLogin = this.service.loginClient(dto);
        if (userLogin == null)
            return ResponseEntity.badRequest().body(null);
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
