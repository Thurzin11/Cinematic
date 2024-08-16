package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.UsuarioRegisterDTO;
import com.tcc.cinematic.DTO.UsuarioUpdateDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import com.tcc.cinematic.repository.UsuarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> findAll(){
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

    public Boolean delete(UUID id){
        var userFound = this.findById(id);
        if (userFound ==  null)
            return false;

        this.repository.delete(userFound);
        return true;
    }
     public List<Usuario> findByTipoUsuario(String tipoUsuario){
        if (tipoUsuario.equalsIgnoreCase(String.valueOf(TipoUsuario.FUNCIONARIO)))
            return this.repository.findByTipoUsuario(TipoUsuario.FUNCIONARIO);
        else {
            return this.repository.findByTipoUsuario(TipoUsuario.GERENTE);
        }
     }
     public List<Usuario> findByStatus(Boolean status){
        return this.repository.findByStatus(status);
     }
     public List<Usuario> findByEmail(String email){
        return this.repository.findByEmail(email);
     }


     public List<Usuario> findByGerenteAndFuncionario(){
        var funcionariosList = this.repository.findByTipoUsuario(TipoUsuario.GERENTE);
        funcionariosList.addAll(this.repository.findByTipoUsuario(TipoUsuario.FUNCIONARIO));
        return funcionariosList;
     }

//     public List<Usuario> filtros(Map<String,String> map){
//        var cargo = map.get("cargo");
//        var status = map.get("status");
//        var email = map.get("email");
//        List<Usuario> usuarioList;
//        if (cargo!=null)
//           usuarioList =  this.findByTipoUsuario(cargo);
//        if (status!null)
//
//     }

}
