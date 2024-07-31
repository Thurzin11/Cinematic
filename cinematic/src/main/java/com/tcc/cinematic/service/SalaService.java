package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SalaRecordDTO;
import com.tcc.cinematic.entity.Sala;
import com.tcc.cinematic.enums.TamanhoSala;
import com.tcc.cinematic.enums.TipoSala;
import com.tcc.cinematic.repository.SalaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SalaService {
    @Autowired
    private SalaRepository repository;

    public List<Sala> findAll() {
        return this.repository.findAll();
    }

    public Sala findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Sala create(SalaRecordDTO salaRecordDTO) {
        var sala = Sala.builder()
                .numero(this.findAll().size()+1)
                .tamanho(this.setTamanho(salaRecordDTO.tamanho()))
                .tipo(this.setTipo(salaRecordDTO.tipo()))
                .fileiras(this.setFileiras(salaRecordDTO.quantidadeFileiras()))
                .quantidadeColunas(salaRecordDTO.quantidadeColunas())
                .build();

        return this.repository.save(sala);
    }

    public Sala update(SalaRecordDTO salaRecordDTO) {
        var salaFound = this.findById(salaRecordDTO.id());
        if(salaFound == null)
            return null;

        BeanUtils.copyProperties(salaRecordDTO, salaFound);
        return this.repository.save(salaFound);
    }

    public Boolean delete(UUID id) {
        var salaFound = this.findById(id);
        if(salaFound == null)
            return false;

        this.repository.delete(salaFound);
        return true;
    }

    private TamanhoSala setTamanho(String tamanho) {
        return switch (tamanho.toUpperCase()) {
            case "GRANDE" -> TamanhoSala.GRANDE;
            case "MEDIA" -> TamanhoSala.MEDIA;
            case "PEQUENA" -> TamanhoSala.PEQUENA;
            default -> null;
        };
    }

    private TipoSala setTipo(String tipo) {
        return switch (tipo.toUpperCase()) {
            case "CINEMA" -> TipoSala.CINEMA;
            case "TEATRO" -> TipoSala.TEATRO;
            case "EVENTO" -> TipoSala.EVENTO;
            default ->  null;
        };
    }

    private List<String> setFileiras(int quantidadeFileiras) {
        var character = new ArrayList<Character>();
        var fileiras = new ArrayList<String>();

        for(var ch='A'; ch<='Z';ch++) {
            character.add(ch);
        }

        for(var i=0; i<quantidadeFileiras; i++) {
            fileiras.add(Character.toString(character.get(i)));
        }

        return fileiras;
    }
}
