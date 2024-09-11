package com.tcc.cinematic.DTO;

import jakarta.validation.constraints.NotNull;

public record LoginFuncionarioDTO(@NotNull String login,@NotNull String password) {
}
