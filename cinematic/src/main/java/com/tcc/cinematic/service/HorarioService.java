package com.tcc.cinematic.service;


import com.tcc.cinematic.entity.Horario;
import com.tcc.cinematic.repository.HorarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository repository;

    public List<Horario> findAll() { return this.repository.findAll();}

    public Horario findById(UUID id) { return this.repository.findById(id).orElse(null);}

    public Horario create(Horario horario){
        return this.repository.save(horario);
    }

    public Horario update(Horario horario){
        var horarioFound = this.findById(horario.getId());
        if (horarioFound == null){
            return null;
        }
        BeanUtils.copyProperties(horario, horarioFound);
        return this.repository.save(horarioFound);
    }

    public Boolean delete(UUID id) {
        var horarioFound = this.findById(id);
        if (horarioFound == null){
            return false;
        }
        this.repository.delete(horarioFound);
        return true;
    }
}
