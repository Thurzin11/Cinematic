package com.tcc.cinematic.repository;

import com.tcc.cinematic.entity.Assento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssentoRepository extends JpaRepository<Assento, UUID> {
}
