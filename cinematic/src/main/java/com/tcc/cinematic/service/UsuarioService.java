package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.ClienteRegisterDTO;
import com.tcc.cinematic.DTO.LoginClientDTO;
import com.tcc.cinematic.DTO.UsuarioResponseDTO;
import com.tcc.cinematic.DTO.LoginFuncionarioDTO;
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
import java.util.stream.Stream;

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

    public Usuario createClient(ClienteRegisterDTO dto){
        var user = Usuario.builder().tipoUsuario(TipoUsuario.CLIENTE).status(true).build();
        BeanUtils.copyProperties(dto,user);
        this.repository.save(user);
        return user;
    }

    public Usuario createFuncionario(UsuarioResponseDTO usuarioResponseDTO){
        var user  = Usuario.builder().login(usuarioResponseDTO.email()).senha(usuarioResponseDTO.email()).build();
        BeanUtils.copyProperties(usuarioResponseDTO,user);
        this.repository.save(user);
        return user;
    }

    public Usuario update(UsuarioResponseDTO usuarioResponseDTO){
        var userFound = this.findById(usuarioResponseDTO.id());
        if (userFound == null)
            return null;
        BeanUtils.copyProperties(usuarioResponseDTO,userFound);
        return this.repository.save(userFound);
    }

    public Boolean delete(UUID id){
        var userFound = this.findById(id);
        if (userFound ==  null)
            return false;
        this.repository.delete(userFound);
        return true;
    }

     public Stream<Usuario> findByGerenteAndFuncionario(){
        return this.repository.findByGerenteAndFuncionario().stream();
     }

     public Usuario inativarUsuario(UUID id){
        var usuarioFound = this.findById(id);
         System.out.println(usuarioFound.toString());
        usuarioFound.setStatus(false);
        return this.repository.save(usuarioFound);
     }
    public Usuario ativarUsuario(UUID id){
        var usuarioFind = this.findById(id);
        usuarioFind.setStatus(true);
        return this.repository.save(usuarioFind);
    }

    public Stream<UsuarioResponseDTO> findByName(String nome){
        return this.repository.findByName("%"+nome+"%")
                .stream().map(usuario -> new UsuarioResponseDTO(usuario.getId(), usuario.getNome(),usuario.getEmail(),usuario.getStatus(),usuario.getTipoUsuario()));
    }


    public Stream<UsuarioResponseDTO> findByFilters(Map<String,List<String>> filtro){
        StringBuilder sql = new StringBuilder();
        sql.append(" " +
                "SELECT * FROM usuario " +
                "WHERE 1=1 ");

        Map<String, Object> map = new HashMap<>();

        if (filtro.get("cargo")!=null && !filtro.get("cargo").isEmpty()){
            sql.append("AND tipo_usuario IN (:TIPO_USUARIO) ");
            map.put("TIPO_USUARIO",this.setCargo(filtro.get("cargo")));
        }else{
            sql.append("AND (tipo_usuario = 'FUNCIONARIO' OR tipo_usuario = 'GERENTE') ");
        }

        if(filtro.get("status")!=null && !filtro.get("status").isEmpty() && this.setStatus(filtro.get("status"))!=null){
            sql.append(" AND status = :STATUS ");
            map.put("STATUS",this.setStatus(filtro.get("status")));
        }

        if (filtro.get("email")!=null && !filtro.get("email").isEmpty()){
            sql.append(" AND email LIKE :EMAIL ");
            map.put("EMAIL","%"+filtro.get("email").getFirst()+"%");
        }

        Query query = entityManager.createNativeQuery(sql.toString(), Usuario.class);
        map.forEach(query::setParameter);

        List<Usuario> listFiltro = query.getResultList();
        return listFiltro.stream().map(usuario -> new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),usuario.getStatus(),usuario.getTipoUsuario()));
    }

     private List<String> setCargo(List<String> cargos){
        List<String> cargosUpperCase = new ArrayList<>();
        for (String cargo: cargos){
            cargosUpperCase.add(cargo.toUpperCase());
        }
        return cargosUpperCase;
    }

    private Boolean setStatus(List<String> status){
        if (status.size()>=2){
            return null;
        }
        if (status.getFirst().equals("ativo")){
            return true;
        }
        if (status.getFirst().equals("false")){
            return false;
        }
        return null;
    }

    public UsuarioResponseDTO convertToDTO(Usuario usuario){
        return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getStatus(),usuario.getTipoUsuario());
    }

    public Stream<UsuarioResponseDTO> convertToDTOStream(Stream<Usuario> usuarios){
        return usuarios
                .map(usuario -> new UsuarioResponseDTO(usuario.getId(),usuario.getNome(),usuario.getEmail(),usuario.getStatus(),usuario.getTipoUsuario()));
    }

    public Usuario loginFuncionario(LoginFuncionarioDTO dto){
        return this.repository.findByLoginAndSenha(dto.login(), dto.password()).orElse(null);
    }

    public Usuario loginClient(LoginClientDTO dto){
        return this.repository.findByEmailAndSenha(dto.email(), dto.password()).orElse(null);
    }

}
