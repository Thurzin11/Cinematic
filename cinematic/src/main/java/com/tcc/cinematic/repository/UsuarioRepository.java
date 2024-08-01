package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    List<Usuario> findByNomeAndTipoUsuario(String nome, TipoUsuario tipoUsuario);
}
