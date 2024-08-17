package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import jakarta.annotation.Nullable;

import java.util.List;

public record FilmeFilterParams(@Nullable List<Categoria> categorias, @Nullable List<String> classificacoes, @Nullable List<Integer> duracoes, @Nullable List<StatusFilme> status) {
}
