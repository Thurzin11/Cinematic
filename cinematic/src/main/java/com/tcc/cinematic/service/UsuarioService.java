package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.FuncionarioRegisterDTO;
import com.tcc.cinematic.DTO.UsuarioFilterParams;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import com.tcc.cinematic.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Usuario> findAll(){
        return this.repository.findAll();
    }

    public Usuario findById(UUID id){
        return this.repository.findById(id).orElse(null);
    }

    public Usuario create(FuncionarioRegisterDTO funcionarioRegisterDTO){
        var user  = new Usuario();
        BeanUtils.copyProperties(funcionarioRegisterDTO,user);
        user.setLogin(funcionarioRegisterDTO.email());
        user.setSenha(funcionarioRegisterDTO.email());
        return this.repository.save(user);
    }

    public Usuario update(FuncionarioRegisterDTO funcionarioRegisterDTO){
        var userFound = this.findById(funcionarioRegisterDTO.id());
        if (userFound == null)
            return null;
        BeanUtils.copyProperties(funcionarioRegisterDTO,userFound);
        return this.repository.save(userFound);
    }

    public Boolean delete(UUID id){
        var userFound = this.findById(id);
        if (userFound ==  null)
            return false;

        this.repository.delete(userFound);
        return true;
    }
     public List<Usuario> findByTipoUsuario(TipoUsuario tipoUsuario){
        if (tipoUsuario.equals(TipoUsuario.FUNCIONARIO))
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

     public List<Usuario> findByName(String nome){
        return this.repository.findByName("%"+nome+"%");
     }

     public Usuario inativarUsuario(UUID id){
        var usuario = this.findById(id);
        usuario.setStatus(false);
        return this.repository.save(usuario);
     }
    public Usuario ativarUsuario(UUID id){
        var usuario = this.findById(id);
        usuario.setStatus(true);
        return this.repository.save(usuario);
    }


     public List<Usuario> findByFilters(UsuarioFilterParams params){
//        return this.repository.findByFilter(params.tipo(),params.status(), params.email());
         StringBuilder sql = new StringBuilder();
         sql.append(" " +
                 "SELECT * FROM usuario " +
                 "WHERE 1=1 ");

         Map<String, Object> map = new HashMap<>();

         if ( params.tipo()!=null && !params.tipo().isEmpty()){
             sql.append("AND tipo_usuario IN (:TIPO_USUARIO) ");
             map.put("TIPO_USUARIO",params.tipo());
         }
         if(params.status()!=null){
             sql.append("AND status = :STATUS ");
             map.put("STATUS",params.status());
         }
         if (params.email()!=null && !params.email().isEmpty()){
             sql.append("AND email LIKE :EMAIL");
             map.put("EMAIL","%"+params.email()+"%");
         }
         Query query = entityManager.createNativeQuery(sql.toString(), Usuario.class);
         map.forEach(query::setParameter);

         return query.getResultList();
     }

}
