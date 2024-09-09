package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SalaRecordDTO;
import com.tcc.cinematic.entity.Sala;
import com.tcc.cinematic.enums.TamanhoSala;
import com.tcc.cinematic.enums.TipoSala;
import com.tcc.cinematic.repository.SalaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SalaService {
    @Autowired
    private SalaRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Sala> findAll() {
        return this.repository.findAll();
    }

    public Sala findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }
}
