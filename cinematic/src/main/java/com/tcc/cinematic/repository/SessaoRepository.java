package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Sessao s SET s.disponibilidade = false WHERE s.id = :ID")
    void inativar(@Param("ID") UUID id);

    @Modifying
    @Transactional
    @Query("UPDATE Sessao s SET s.disponibilidade = true WHERE s.id = :ID")
    void ativar(@Param("ID") UUID id);
}
