package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.TamanhoSala;
import com.tcc.cinematic.enums.TipoSala;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Sala {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private int numero;
    @Enumerated(EnumType.STRING)
    private TipoSala tipo;
    @Enumerated(EnumType.STRING)
    private TamanhoSala tamanho;
    private boolean disponibilidade;
}
