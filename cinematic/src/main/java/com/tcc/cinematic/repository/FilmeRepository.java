package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FilmeRepository extends JpaRepository<Filme, UUID> {
    List<Filme> findByCategoria(Categoria categoria);
    List<Filme> findByClassificacao(Classificacao classificacao);
    List<Filme> findByDuracaoLessThanEqual(int duracao);
    List<Filme> findByDuracaoGreaterThan(int duracao);
    List<Filme> findByStatus(StatusFilme status);

    @Query("SELECT f FROM Filme f " +
            "INNER JOIN f.categoria c" +
            "WHERE c.nome LIKE %:CATEGORIA% AND" +
            "f.classificacao = :CLASSIFICACAO AND" +
            "f.duracao >= :DURACAO AND" +
            "f.status = :STATUS")
    List<Filme> filtro(@Param("CATEGORIA") Categoria categoria,
                       @Param("CLASSIFICACAO") Classificacao classificacao,
                       @Param("DURACAO") int duracao,
                       @Param("STATUS")StatusFilme status);
}
