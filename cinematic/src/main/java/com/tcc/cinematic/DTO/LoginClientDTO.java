package com.tcc.cinematic.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginClientDTO(@NotNull @NotBlank String email, @NotNull @NotBlank String password) {
}
