package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.DTO.FilmeUpdateDTO;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import com.tcc.cinematic.repository.FilmeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FilmeService {
    @Autowired
    private FilmeRepository repository;

    public List<Filme> findAll() {
        return this.repository.findAll();
    }

    public Filme findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Filme create(FilmeRegisterDTO filmeRegisterDTO) {
        var filme = new Filme();
        filme.setClassificacao(this.setClassificacao(filmeRegisterDTO.classificacao()));
        BeanUtils.copyProperties(filmeRegisterDTO, filme);
        return this.repository.save(filme);
    }

    public Filme update(FilmeUpdateDTO filmeUpdateDTO, UUID id) {
        var filmeFound = this.findById(id);
        if(filmeFound == null)
            return null;

        BeanUtils.copyProperties(filmeUpdateDTO, filmeFound);
        filmeFound.setClassificacao(this.setClassificacao(filmeUpdateDTO.classificacao()));
        filmeFound.setStatus(this.setStatus(filmeUpdateDTO.status()));
        return this.repository.save(filmeFound);
    }

    public boolean delete(UUID id) {
        var filmeFound = this.findById(id);
        if(filmeFound == null)
            return false;

        this.repository.delete(filmeFound);
        return true;
    }

    private Classificacao setClassificacao(String classificacao) {
        return switch (classificacao.toUpperCase()) {
            case "LIVRE" -> Classificacao.LIVRE;
            case "DEZ" -> Classificacao.DEZ;
            case "DOZE" -> Classificacao.DOZE;
            case "QUATORZE" -> Classificacao.QUATORZE;
            case "DEZESSEIS" -> Classificacao.DEZESSEIS;
            case "DEZOITO" -> Classificacao.DEZOITO;
            default -> null;
        };
    }

    private StatusFilme setStatus(String status) {
        return switch (status.toUpperCase()) {
            case "CARTAZ" -> StatusFilme.CARTAZ;
            case "DESTAQUE" -> StatusFilme.DESTAQUE;
            case "LANCAMENTO" -> StatusFilme.LANCAMENTO;
            case "ESTREIA" -> StatusFilme.ESTREIA;
            case "PRE_ESTREIA" -> StatusFilme.PRE_ESTREIA;
            default -> null;
        };
    }
}
