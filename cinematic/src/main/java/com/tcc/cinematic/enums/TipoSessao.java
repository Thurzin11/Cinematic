package com.tcc.cinematic.enums;

public enum TipoSessao {
    A("2D"), B("3D"), C("4D"), D("D-BOX");

    public String tipoSessao;
    TipoSessao(String tipoSessao) {
        this.tipoSessao = tipoSessao;
    }
}
