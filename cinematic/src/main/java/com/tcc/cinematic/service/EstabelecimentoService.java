package com.tcc.cinematic.service;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.repository.EstabelecimentoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EstabelecimentoService {
    @Autowired
    private EstabelecimentoRepository repository;

    public List<Estabelecimento> findAll() {
        return this.repository.findAll();
    }

    public Estabelecimento findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Estabelecimento create(Estabelecimento estabelecimento) {
        return this.repository.save(estabelecimento);
    }

    public Estabelecimento update(Estabelecimento estabelecimento) {
        var estabelecimentoFound = this.findById(estabelecimento.getId());
        if(estabelecimentoFound == null)
            return null;

        BeanUtils.copyProperties(estabelecimento, estabelecimentoFound);
        return this.repository.save(estabelecimentoFound);
    }

    public boolean delete(UUID id) {
        var estabelecimentoFound = this.findById(id);
        if(estabelecimentoFound == null)
            return false;

        this.repository.delete(estabelecimentoFound);
        return true;
    }
}
