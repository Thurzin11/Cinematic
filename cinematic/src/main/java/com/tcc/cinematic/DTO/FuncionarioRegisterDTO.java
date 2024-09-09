package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.TipoUsuario;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;


public record FuncionarioRegisterDTO(UUID id,@NotNull String nome, @NotNull String email, @NotNull Boolean status, @NotNull
                                     TipoUsuario tipoUsuario) {

}
