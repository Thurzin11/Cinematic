package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.TrailerRegisterDTO;
import com.tcc.cinematic.DTO.TrailerUpdateDTO;
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

    public Trailer create(TrailerRegisterDTO trailerRegisterDTO) {
        var trailer = new Trailer();
        trailer.setUrlTrailer(trailerRegisterDTO.urlTrailer());
        if(trailerRegisterDTO.urlCapa() != null) {
            trailer.setUrlCapa(trailerRegisterDTO.urlCapa());
        }
        return this.repository.save(trailer);
    }

    public Trailer update(TrailerUpdateDTO trailerUpdateDTO) {
        var trailerFound = this.findById(trailerUpdateDTO.id());
        if(trailerFound == null)
            return null;

        BeanUtils.copyProperties(trailerUpdateDTO, trailerFound);
        return this.repository.save(trailerFound);
    }

    public boolean delete(UUID id) {
        var trailerFound = this.findById(id);
        if(trailerFound == null)
            return false;

        this.repository.delete(trailerFound);
        return true;
    }
}
