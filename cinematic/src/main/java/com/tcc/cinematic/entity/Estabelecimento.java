package com.tcc.cinematic.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Estabelecimento {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @NotNull
    @NotBlank
    private String nome;
    @NotNull
    @NotBlank
    private String rua;
    @NotNull
    private int numero;
    @NotNull
    @NotBlank
    private String bairro;
    @NotNull
    @NotBlank
    private String cidade;
    @NotNull
    @NotBlank
    private String estado;
    @NotNull
    @NotBlank
    private String cep;
}
