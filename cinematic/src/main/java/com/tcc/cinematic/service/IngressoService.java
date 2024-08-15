package com.tcc.cinematic.service;

import com.tcc.cinematic.entity.Ingresso;
import com.tcc.cinematic.repository.IngressoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class IngressoService {
    @Autowired
    private IngressoRepository repository;
    @Autowired
    private AssentoService assentoService;

    public List<Ingresso> findAll(){
        return this.repository.findAll();
    }

    public Ingresso findById(UUID id){
        return this.repository.findById(id).orElse(null);
    }

    public Ingresso create(Ingresso ingresso){
        var retorno = this.assentoService.reservarAssento(ingresso.getAssento());
        if (retorno==null)
            return null;
        ingresso.setAssento(retorno);
        return this.repository.save(ingresso);
    }

    public Ingresso edit(Ingresso ingresso){
        var ingressoFound = this.findById(ingresso.getId());
        if (ingressoFound == null)
            return null;

        BeanUtils.copyProperties(ingresso,ingressoFound);
        return this.repository.save(ingressoFound);
    }

    public boolean delete(UUID id){
        var ingressoFound = this.findById(id);
        if (ingressoFound == null)
            return false;
        this.repository.delete(ingressoFound);
        return true;
    }

}
