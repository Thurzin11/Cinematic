package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.AssentoRecordDTO;
import com.tcc.cinematic.entity.Assento;
import com.tcc.cinematic.repository.AssentoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AssentoService {

    @Autowired
    private AssentoRepository repository;

    public List<Assento> findAll() { return this.repository.findAll();}

    public Assento findById(UUID id) { return this.repository.findById(id).orElse(null);}

    public Assento create(Assento assento){
        return this.repository.save(assento);
    }

    public Assento update(AssentoRecordDTO assentoRecordDTO){
        var assentoFound = this.findById(assentoRecordDTO.id());
        if (assentoFound == null){
            return null;
        }
        BeanUtils.copyProperties(assentoRecordDTO, assentoFound);
        return this.repository.save(assentoFound);
    }

    public Boolean delete(UUID id) {
        var assentofound = this.findById(id);
        if (assentofound == null){
            return false;
        }
        this.repository.delete(assentofound);
        return true;
    }


}
