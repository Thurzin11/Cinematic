package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Assento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssentoRepository extends JpaRepository<Assento, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Assento a SET a.status='RESERVADO' WHERE a.id=:id")
    void reservarAssento(@Param("id") UUID id);
}
