package com.tcc.cinematic.repository;

import com.tcc.cinematic.DTO.FuncionarioRegisterDTO;
import com.tcc.cinematic.entity.Usuario;
import com.tcc.cinematic.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
//    @Query("SELECT * FROM USUARIO u WHERE u.tipou")
//    List<Usuario> findByTipoUsuarioFuncionarioGerente();
    @Query(value = "FROM Usuario u " +
            "WHERE (tipoUsuario LIKE 'GERENTE' OR tipoUsuario LIKE 'FUNCIONARIO')")
    List<Usuario> findByGerenteAndFuncionario();

    @Query(value = "SELECT * FROM usuario "+
            "WHERE nome LIKE :NOME "+
            "AND (tipo_usuario LIKE 'GERENTE' OR tipo_usuario LIKE 'FUNCIONARIO')",nativeQuery = true)
    List<Usuario> findByName(@Param("NOME") String nome);

//    @Query(value = "SELECT * FROM usuario " +
//            "WHERE 1=1 " +
//            "AND (:TIPO_USUARIO ISNULL OR tipo_usuario IN (:TIPO_USUARIO)) " +
//            "AND (:STATUS ISNULL OR status = :STATUS) " +
//            "AND (:EMAIL ISNULL OR email LIKE '%:EMAIL%')", nativeQuery = true)
//    List<Usuario> findByFilter(@Param("TIPO_USUARIO") List<TipoUsuario> tipos,
//                               @Param("STATUS") Boolean status,
//                               @Param("EMAIL") String email);
}
