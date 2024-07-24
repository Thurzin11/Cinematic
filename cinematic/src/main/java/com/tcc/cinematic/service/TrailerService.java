package com.tcc.cinematic.service;

import com.tcc.cinematic.entity.Trailer;
import com.tcc.cinematic.repository.TrailerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TrailerService {
    @Autowired
    private TrailerRepository repository;

    public List<Trailer> findAll() {
        return this.repository.findAll();
    }

    public Trailer findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Trailer create(Trailer trailer) {
        return this.repository.save(trailer);
    }

    public Trailer update(Trailer trailer) {
        var trailerFound = this.findById(trailer.getId());
        if(trailerFound == null)
            return null;

        BeanUtils.copyProperties(trailer, trailerFound);
        return this.repository.save(trailerFound);
    }

    public Boolean delete(UUID id) {
        var trailerFound = this.findById(id);
        if(trailerFound == null)
            return false;

        this.repository.delete(trailerFound);
        return true;
    }
}
