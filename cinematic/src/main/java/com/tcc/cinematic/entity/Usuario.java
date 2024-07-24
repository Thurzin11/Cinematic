package com.tcc.cinematic.entity;

import com.tcc.cinematic.enums.TipoUsuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String nome;
    private String email;
    private String senha;
    private Boolean status = true;
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;
    private String login;
    private Boolean isGerente;
    private String cidade;
    private String estado;
}
