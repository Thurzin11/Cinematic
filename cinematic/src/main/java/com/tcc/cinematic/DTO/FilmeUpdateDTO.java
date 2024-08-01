package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Trailer;

import java.time.LocalDate;
import java.util.List;

public record FilmeUpdateDTO(String nome,
                             Categoria categoria,
                             int duracao,
                             String classificacao,
                             LocalDate dataEstreia,
                             String descricao,
                             String direcao,
                             String posterUrl,
                             String distribuidora,
                             String status,
                             List<String> capas,
                             List<Trailer> trailers) {
}
