package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FilmeRepository extends JpaRepository<Filme, UUID> {
    @Query("SELECT f FROM Filme f WHERE f.nome ILIKE %:NOME%")
    List<Filme> findByNomeIlike(@Param("NOME") String nome);
    @Modifying
    @Transactional
    @Query("UPDATE Filme f SET f.disponibilidade = false WHERE f.id = :ID")
    void inativar(@Param("ID") UUID id);
    @Modifying
    @Transactional
    @Query("UPDATE Filme f SET f.disponibilidade = true WHERE f.id = :ID")
    void ativar(@Param("ID") UUID id);
    List<Filme> findByDisponibilidadeTrue();
}
