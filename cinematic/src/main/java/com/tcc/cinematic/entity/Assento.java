package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.StatusAssento;
import com.tcc.cinematic.enums.TipoAssento;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Assento {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoAssento tipo;

    @Enumerated(EnumType.STRING)
    private StatusAssento status;
}
