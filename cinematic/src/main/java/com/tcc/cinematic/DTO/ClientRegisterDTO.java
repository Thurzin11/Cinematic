package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.TipoUsuario;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ClientRegisterDTO(UUID id, @NotNull String nome, @NotNull String email, @NotNull
TipoUsuario tipoUsuario, @NotNull String senha,@NotNull String estado,@NotNull String cidade) {
}
