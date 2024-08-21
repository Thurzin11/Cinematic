package com.tcc.cinematic.DTO;

import com.tcc.cinematic.enums.TipoUsuario;

import java.util.List;

public record UsuarioFilterParams(List<String> tipo, Boolean status, String email) {
}
