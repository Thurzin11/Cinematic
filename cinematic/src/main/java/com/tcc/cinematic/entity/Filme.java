package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Filme {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String nome;
    @ManyToOne
    private Categoria categoria;
    private String duracao;
    @Enumerated(EnumType.STRING)
    private Classificacao classificacao;
    @Column(length = 1000)
    private String descricao;
    private LocalDate dataEstreia;
    private boolean disponibilidade;
    private String banner;
    private String direcao;
    private String distribuidora;
    @Enumerated(EnumType.STRING)
    private StatusFilme status;
    private List<String> capas;
    private List<String> trailers;
}
