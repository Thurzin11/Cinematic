package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.Periodo;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Horario {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;

    private String horario;

    private boolean status = true;

    @Enumerated(EnumType.STRING)
    private Periodo periodo;

}
