package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.entity.Horario;
import com.tcc.cinematic.entity.Sala;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record SessaoRecordDTO(
        UUID id,
        @NotNull Sala sala,
        @NotNull Horario horario,
        @NotNull Filme filme,
        @NotNull Estabelecimento estabelecimento,
        @NotNull @NotBlank String idioma,
        @NotNull @NotBlank String tipo,
        @NotNull LocalDate data) {
}
