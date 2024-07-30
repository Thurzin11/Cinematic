package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SessaoUpdateDTO;
import com.tcc.cinematic.entity.Sessao;
import com.tcc.cinematic.enums.Idioma;
import com.tcc.cinematic.enums.TipoSessao;
import com.tcc.cinematic.repository.SessaoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SessaoService {
    @Autowired
    private SessaoRepository repository;

    public List<Sessao> findAll() {
        return this.repository.findAll();
    }

    public Sessao findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Sessao create(Sessao sessao) {
        return this.repository.save(sessao);
    }

    public Sessao update(SessaoUpdateDTO sessaoUpdateDTO, UUID id) {
        var sessaoFound = this.findById(id);
        if(sessaoFound == null)
            return null;

        if(!sessaoUpdateDTO.tipo().isEmpty())
            sessaoFound.setTipo(this.setSessao(sessaoUpdateDTO.tipo()));

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

    private TipoSessao setSessao(String sessao) {
        return switch (sessao.toUpperCase()) {
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
}
