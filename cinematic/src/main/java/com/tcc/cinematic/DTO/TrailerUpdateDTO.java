package com.tcc.cinematic.DTO;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record TrailerUpdateDTO(@NotNull UUID id, String urlCapa, String urlTrailer) {
}
