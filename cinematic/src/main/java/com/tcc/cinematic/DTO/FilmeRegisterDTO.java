package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Categoria;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record FilmeRegisterDTO(
        @NotNull  String nome,
        @NotNull Categoria categoria,
        @NotNull String classificacao,
        @NotNull String descricao,
        @NotNull String direcao,
        @NotNull String duracao,
        @NotNull LocalDate dataEstreia,
        @NotNull String banner,
        @NotNull String status,
        List<String> trailers,
        @NotNull List<String> capas){
}
