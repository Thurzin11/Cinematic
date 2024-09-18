package com.tcc.cinematic.DTO;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ClienteRegisterDTO(@Nullable UUID id, @NotNull @NotBlank String nome, @NotNull @NotBlank String email, @NotNull @NotBlank String senha, @NotNull @NotBlank String tipoUsuario, @NotNull @NotBlank String cidade, @NotNull @NotBlank String estado) {
}
