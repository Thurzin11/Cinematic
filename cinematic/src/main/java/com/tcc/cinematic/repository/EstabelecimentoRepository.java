package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, UUID> {

    List<Estabelecimento> findByNomeLike(String nome);

}
