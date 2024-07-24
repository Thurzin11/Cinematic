package com.tcc.cinematic.DTO;

import jakarta.validation.Valid;

public record TrailerRegisterDTO(@Valid String urlTrailer, String urlCapa) {
}
