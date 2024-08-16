package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Categoria;

import java.time.LocalDate;
import java.util.UUID;

public record FilmeRegisterDTO(String nome, Categoria categoria, String classificacao, int duracao, String dataEstreia, String posterUrl, String status){
}
