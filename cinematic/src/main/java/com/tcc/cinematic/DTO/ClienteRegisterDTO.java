package com.tcc.cinematic.DTO;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ClienteRegisterDTO(UUID id, @NotNull String nome, @NotNull String email, @NotNull String senha, @NotNull String validSenha,@NotNull String estado,@NotNull String cidade) {
}
