package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
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
        return this.repository.save(filme);
    }

    private Classificacao setClassificacao(String classificacao) {
        return switch (classificacao.toUpperCase()) {
          case "LIVRE" -> Classificacao.LIVRE;
          case "10+" -> Classificacao.DEZ;
          case "12+" -> Classificacao.DOZE;
          case "14+" -> Classificacao.QUATORZE;
          case "16+" -> Classificacao.DEZESSEIS;
          case "18+" -> Classificacao.DEZOITO;
          default -> null;
        };
    }

    public Filme update(Filme filme) {
        var filmeFound = this.findById(filme.getId());
        if(filmeFound == null)
            return null;

        BeanUtils.copyProperties(filme, filmeFound);
        return this.repository.save(filmeFound);
    }

    public Boolean delete(UUID id) {
        var filmeFound = this.findById(id);
        if(filmeFound == null)
            return false;

        this.repository.delete(filmeFound);
        return true;
    }
}
