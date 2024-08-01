package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.TipoUsuario;
import jakarta.validation.constraints.NotNull;

public record UsuarioRegisterDTO(@NotNull String nome, @NotNull String email, @NotNull String senha, @NotNull TipoUsuario tipoUsuario) {
}
