package com.tcc.cinematic.DTO;

import java.util.UUID;

public record UsuarioUpdateDTO(UUID id, String nome, String email) {
}
