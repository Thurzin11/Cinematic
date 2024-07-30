package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.entity.Horario;
import com.tcc.cinematic.entity.Sessao;
import com.tcc.cinematic.enums.Idioma;
import com.tcc.cinematic.enums.TipoSessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, UUID> {
    List<Sessao> findByHorarioBetween(Horario horarioInicial, Horario horarioFinal);
    List<Sessao> findByFilme(Filme filme);
    List<Sessao> findByDisponibilidadeTrue();
    List<Sessao> findByEstabelecimento(Estabelecimento estabelecimento);
    List<Sessao> findByIdioma(Idioma idioma);
    List<Sessao> findByTipo(TipoSessao tipo);
    List<Sessao> findByDataBetween(LocalDate dataInicial, LocalDate dataFinal);
    List<Sessao> findByData(LocalDate data);
}
