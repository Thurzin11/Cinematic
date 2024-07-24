package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.TipoUsuario;
import jakarta.validation.Valid;

public record UsuarioRegisterDTO(@Valid String nome, @Valid String email, @Valid String senha, @Valid TipoUsuario tipoUsuario) {
}
