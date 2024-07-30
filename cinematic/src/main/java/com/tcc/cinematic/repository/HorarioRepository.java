package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, UUID> {
}
