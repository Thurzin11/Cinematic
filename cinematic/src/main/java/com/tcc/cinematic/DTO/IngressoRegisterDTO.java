package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Assento;
import com.tcc.cinematic.entity.Sessao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IngressoRegisterDTO(@NotNull Sessao sessao, @NotNull Assento assento, @NotNull @NotBlank String tipo, @NotNull Integer valor) {
}
