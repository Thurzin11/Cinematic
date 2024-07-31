package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SessaoUpdateDTO;
import com.tcc.cinematic.entity.*;
import com.tcc.cinematic.enums.Idioma;
import com.tcc.cinematic.enums.TamanhoSala;
import com.tcc.cinematic.enums.TipoSessao;
import com.tcc.cinematic.repository.SessaoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SessaoService {
    @Autowired
    private SessaoRepository repository;

    @Autowired
    private AssentoService assentoService;

    public List<Sessao> findAll() {
        return this.repository.findAll();
    }

    public List<Sessao> findByHorarioBetween(Horario horarioInicial, Horario horarioFinal) {
        return this.repository.findByHorarioBetween(horarioInicial, horarioFinal);
    }

    public List<Sessao> findByFilme(Filme filme) {
        return this.repository.findByFilme(filme);
    }

    public List<Sessao> findByDisponibilidade() {
        return this.repository.findByDisponibilidadeTrue();
    }

    public List<Sessao> findByEstabelecimento(Estabelecimento estabelecimento) {
        return this.repository.findByEstabelecimento(estabelecimento);
    }

    public List<Sessao> findByIdioma(String idioma) {
        return this.repository.findByIdioma(this.setIdioma(idioma));
    }

    public List<Sessao> findByTipo(String tipo) {
        return this.repository.findByTipo(this.setTipo(tipo));
    }

    public List<Sessao> findByDataBetween(LocalDate dataInicial, LocalDate dataFinal) {
        return this.repository.findByDataBetween(dataInicial, dataFinal);
    }

    public List<Sessao> findByData(LocalDate data) {
        return this.repository.findByData(data);
    }

    public Sessao findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Sessao create(Sessao sessao) {
        sessao.setAssentos(this.gerarAssentos(sessao.getSala()));
        return this.repository.save(sessao);
    }

    public Sessao update(SessaoUpdateDTO sessaoUpdateDTO, UUID id) {
        var sessaoFound = this.findById(id);
        if(sessaoFound == null)
            return null;

        if(!sessaoUpdateDTO.tipo().isEmpty())
            sessaoFound.setTipo(this.setTipo(sessaoUpdateDTO.tipo()));

        if(!sessaoUpdateDTO.idioma().isEmpty())
            sessaoFound.setIdioma(this.setIdioma(sessaoUpdateDTO.idioma()));

        BeanUtils.copyProperties(sessaoUpdateDTO, sessaoFound);
        return this.repository.save(sessaoFound);
    }

    public boolean delete(UUID id) {
        var sessaoFound = this.findById(id);
        if(sessaoFound == null)
            return false;

        this.repository.delete(sessaoFound);
        return true;
    }

    private TipoSessao setTipo(String tipo) {
        return switch (tipo.toUpperCase()) {
            case "2D" -> TipoSessao.A;
            case "3D" -> TipoSessao.B;
            case "4D" -> TipoSessao.C;
            case "D-BOX" -> TipoSessao.D;
            default -> null;
        };
    }

    private Idioma setIdioma(String idioma) {
        return switch (idioma.toUpperCase()) {
            case "DUBLADO" -> Idioma.DUBLADO;
            case "LEGENDADO" -> Idioma.LEGENDADO;
            case "NORMAL" -> Idioma.NORMAL;
            default -> null;
        };
    }

    private List<Assento> gerarAssentos(Sala sala) {
        var assentos = new ArrayList<Assento>();

        return assentos;
    }
}
