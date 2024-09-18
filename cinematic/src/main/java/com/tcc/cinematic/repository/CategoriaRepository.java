package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, UUID> {
    @Query("SELECT c FROM Categoria c WHERE c.nome ILIKE %:NOME%")
    List<Categoria> findByNomeLike(@Param("NOME") String nome);
}
