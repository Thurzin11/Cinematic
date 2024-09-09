package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SalaRepository extends JpaRepository<Sala, UUID> {
    @Query("UPDATE Sala s SET s.disponibilidade = false WHERE s.id = :ID")
    void inativarSala(@Param("ID") UUID id);

    @Query("UPDATE Sala s SET s.disponibilidade = true WHERE s.id = :ID")
    void ativarSala(@Param("ID") UUID id);
}
