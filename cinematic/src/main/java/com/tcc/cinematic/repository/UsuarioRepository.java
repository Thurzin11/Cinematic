package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    @Query(value = "FROM Usuario u " +
            "WHERE (tipoUsuario LIKE 'GERENTE' OR tipoUsuario LIKE 'FUNCIONARIO')")
    List<Usuario> findByGerenteAndFuncionario();

    @Query(value = "SELECT * FROM usuario "+
            "WHERE nome ILIKE :NOME "+
            "AND (tipo_usuario LIKE 'GERENTE' OR tipo_usuario LIKE 'FUNCIONARIO')",nativeQuery = true)
    List<Usuario> findByName(@Param("NOME") String nome);

    Optional<Usuario> findByLoginAndSenha(String login, String senha);
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
}
