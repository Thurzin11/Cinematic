package com.tcc.cinematic.service;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.repository.CategoriaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository repository;

    public List<Categoria> findAll() {
        return this.repository.findAll();
    }

    public Categoria findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Categoria findByNome(String nome) {
        return this.repository.findByNome(nome).orElse(null);
    }

    public Categoria create(Categoria categoria) {
        return this.repository.save(categoria);
    }

    public Categoria update(Categoria categoria) {
        var categoriaFound = this.findById(categoria.getId());
        if(categoriaFound == null)
            return null;

        BeanUtils.copyProperties(categoria, categoriaFound);
        return this.repository.save(categoriaFound);
    }

    public boolean delete(UUID id) {
        var categoriaFound = this.findById(id);
        if(categoriaFound == null)
            return false;

        this.repository.delete(categoriaFound);
        return true;
    }
}
