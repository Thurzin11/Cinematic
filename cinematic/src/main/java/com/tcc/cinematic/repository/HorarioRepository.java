package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, UUID> {

    @Transactional
    @Modifying
    @Query("UPDATE Horario h SET h.status=false WHERE h.id=:ID")
    void inativar(@Param("ID") UUID id);

    @Transactional
    @Modifying
    @Query("UPDATE Horario h SET h.status=true WHERE h.id=:ID")
    void ativar(@Param("ID") UUID id);

}
