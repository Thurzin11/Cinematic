package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record FilmeRegisterDTO(
        @NotNull @NotBlank String nome,
        @NotNull Categoria categoria,
        @NotNull @NotBlank String classificacao,
        @NotNull @NotBlank String descricao,
        @NotNull @NotBlank String direcao,
        @NotNull @NotBlank String duracao,
        @NotNull LocalDate dataEstreia,
        @NotNull @NotBlank String banner,
        @NotNull @NotBlank String status,
        List<String> trailers,
        @NotNull List<String> capas){
}
