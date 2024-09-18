package com.tcc.cinematic.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SalaRecordDTO(UUID id,
                            @NotNull @NotBlank String tamanho,
                            @NotNull @NotBlank String tipo) {
}
