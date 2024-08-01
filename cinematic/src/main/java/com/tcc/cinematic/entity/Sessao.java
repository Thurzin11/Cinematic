package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.Idioma;
import com.tcc.cinematic.enums.TipoSessao;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Sessao {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @ManyToOne
    @NotNull
    private Sala sala;
    @ManyToOne
    @NotNull
    private Horario horario;
    @ManyToOne
    @NotNull
    private Filme filme;
    private boolean disponibilidade = true;
    @OneToMany
    private List<Assento> assentos;
    @ManyToOne
    @NotNull
    private Estabelecimento estabelecimento;
    @Enumerated(EnumType.STRING)
    private Idioma idioma;
    @Enumerated(EnumType.STRING)
    private TipoSessao tipo;
    @NotNull
    private LocalDate data;
}
