package com.tcc.cinematic.enums;

public enum TipoUsuario {
    GERENTE("GERENTE"),
    FUNCIONARIO("FUNCIONARIO"),
    CLIENTE("CLIENTE");

    private final String valor;

    TipoUsuario(String valor){
        this.valor = valor;
    }

    public String getValor() {
        return valor;
    }
}
