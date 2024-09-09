package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SalaRecordDTO;
import com.tcc.cinematic.entity.Sala;
import com.tcc.cinematic.enums.TamanhoSala;
import com.tcc.cinematic.enums.TipoSala;
import com.tcc.cinematic.repository.SalaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SalaService {
    @Autowired
    private SalaRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

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
                .fileiras(this.setFileiras())
                .quantidadeColunas(this.setColunas(this.setTamanho(salaRecordDTO.tamanho())))
                .build();

        return this.repository.save(sala);
    }

    public List<Sala> filter(Map<String, List<String>> filter) {
        if(filter == null || filter.isEmpty())
            return null;

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s FROM Sala s WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();

        if(filter.get("tipo") != null && !filter.get("tipo").isEmpty()) {
            sql.append("AND s.tipo IN (:TIPOS) ");
            params.put("TIPOS", this.setTipoFilter(filter.get("tipo")));
        }

        if(filter.get("status") != null && !filter.get("status").isEmpty()) {
            sql.append("AND s.disponibilidade IN (:DISPONIBILIDADES) ");
            params.put("DISPONIBILIDADES", this.setDisponibilidadeFilter(filter.get("status")));
        }

        if(filter.get("tamanho") != null && !filter.get("tamanho").isEmpty()) {
            sql.append("AND s.tamanho IN (:TAMANHOS) ");
            params.put("TAMANHOS", this.setTamanhoFilter(filter.get("tamanho")));
        }

        Query query = this.entityManager.createQuery(sql.toString());
        params.forEach(query::setParameter);

        return query.getResultList();
    }

    public Sala update(SalaRecordDTO salaRecordDTO) {
        var salaFound = this.findById(salaRecordDTO.id());
        if(salaFound == null)
            return null;

        BeanUtils.copyProperties(salaRecordDTO, salaFound);
        return this.repository.save(salaFound);
    }

    public Boolean inativarSala(UUID id) {
        var sala = this.findById(id);
        if(sala == null)
            return false;

        this.repository.inativarSala(id);
        return true;
    }

    public Boolean ativarSala(UUID id) {
        var sala = this.findById(id);
        if(sala == null)
            return false;

        this.repository.ativarSala(id);
        return true;
    }

    public boolean delete(UUID id) {
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

    private List<TipoSala> setTipoFilter(List<String> params) {
        List<TipoSala> tipos = new ArrayList<>();

        for(String tipo: params) {
            switch (tipo.toUpperCase()) {
                case "CINEMA": {
                    tipos.add(TipoSala.CINEMA);
                    break;
                }
                case "TEATRO": {
                    tipos.add(TipoSala.TEATRO);
                    break;
                }
                case "EVENTO": {
                    tipos.add(TipoSala.EVENTO);
                    break;
                }
            }
        }

        return tipos;
    }

    private List<TamanhoSala> setTamanhoFilter(List<String> params) {
        List<TamanhoSala> tamanhos = new ArrayList<>();

        for(String tamanho:params) {
            switch (tamanho.toUpperCase()) {
                case "GRANDE": {
                    tamanhos.add(TamanhoSala.GRANDE);
                    break;
                }
                case "MEDIA": {
                    tamanhos.add(TamanhoSala.MEDIA);
                    break;
                }
                case "PEQUENA": {
                    tamanhos.add(TamanhoSala.PEQUENA);
                    break;
                }
            }
        }

        return tamanhos;
    }

    private List<String> setFileiras() {
        List<Character> characters = new ArrayList<>();
        List<String> fileiras  = new ArrayList<>();

        for(Character ch = 'A'; ch<='Z'; ch++) {
            characters.add(ch);
        }

        for(var i=0; i<8; i++) {
            fileiras.add(Character.toString(characters.get(i)));
        }

        return fileiras;
    }

    private List<Boolean> setDisponibilidadeFilter(List<String> params) {
        List<Boolean> disponibilidades = new ArrayList<>();

        for(String status:params) {
            switch (status.toUpperCase()) {
                case "ATIVO": {
                    disponibilidades.add(true);
                    break;
                }
                case "INATIVO": {
                    disponibilidades.add(false);
                    break;
                }
            }
        }

        return disponibilidades;
    }

    private int setColunas(TamanhoSala tamanho) {
        return switch (tamanho) {
            case GRANDE -> 26;
            case MEDIA -> 23;
            case PEQUENA -> 20;
        };
    }
}
