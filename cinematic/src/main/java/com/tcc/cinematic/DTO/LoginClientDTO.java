package com.tcc.cinematic.DTO;

import jakarta.validation.constraints.NotNull;

public record LoginClientDTO(@NotNull String email,@NotNull String password) {
}
