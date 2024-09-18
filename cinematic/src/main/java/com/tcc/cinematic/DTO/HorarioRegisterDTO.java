package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.Periodo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record HorarioRegisterDTO(@NotNull @NotBlank String hora, @NotNull @NotBlank String periodo) {
}
