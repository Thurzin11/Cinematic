package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.UsuarioRegisterDTO;
import com.tcc.cinematic.DTO.UsuarioUpdateDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.repository.UsuarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> finAll(){
        return this.repository.findAll();
    }

    public Usuario findById(UUID id){
        return this.repository.findById(id).orElse(null);
    }

    public Usuario create(UsuarioRegisterDTO usuarioRegisterDTO){
        var user  = new Usuario();
        BeanUtils.copyProperties(usuarioRegisterDTO,user);
        return this.repository.save(user);
    }

    public Usuario update(UsuarioUpdateDTO usuarioUpdateDTO){
        var userFound = this.findById(usuarioUpdateDTO.id());
        if (userFound == null)
            return null;

        BeanUtils.copyProperties(usuarioUpdateDTO,userFound);
        return this.repository.save(userFound);
    }

    public boolean delete(UUID id){
        var userFound = this.findById(id);
        if (userFound ==  null)
            return false;

        this.repository.delete(userFound);
        return true;
    }

}
