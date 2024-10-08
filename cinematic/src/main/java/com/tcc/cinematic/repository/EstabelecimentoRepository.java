package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, UUID> {

    @Query(value = "SELECT * FROM estabelecimento "+
            "WHERE nome ILIKE :NOME ",nativeQuery = true)
    List<Estabelecimento> findByNomeLike(@Param("NOME") String nome);

}