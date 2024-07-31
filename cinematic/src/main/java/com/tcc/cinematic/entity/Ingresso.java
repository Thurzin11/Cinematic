package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.TipoIngresso;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Ingresso {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @NotNull
    private Sessao sessao;
    private LocalDate Horario = LocalDate.now();
    @NotNull
    private Assento assento;
    @NotNull
    private Usuario cliente;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoIngresso tipo;
    @NotNull
    private Integer valor;
}
