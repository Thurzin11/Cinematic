package com.tcc.cinematic.DTO;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.entity.Horario;

import java.time.LocalDate;

public record SessaoUpdateDTO(Horario horario, Filme filme, Estabelecimento estabelecimento, String idioma, String tipo, LocalDate data) {
}
