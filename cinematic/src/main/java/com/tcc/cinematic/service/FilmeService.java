package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.*;
import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import com.tcc.cinematic.repository.FilmeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FilmeService {
    @Autowired
    private FilmeRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CategoriaService categoriaService;

    public List<Filme> findAll() {
        return this.repository.findAll();
    }

    public List<Filme> findByNomeIlike(String nome) {
        return this.repository.findByNomeIlike(nome);
    }

    public List<Filme> filters(Map<String, List<String>> filter) {
        if(filter == null || filter.isEmpty())
            return null;

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT f FROM Filme f WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();

        if(filter.get("categoria") != null && !filter.get("categoria").isEmpty()) {
            sql.append("AND f.categoria IN (:CATEGORIAS) ");
            params.put("CATEGORIAS", this.setCategoriaFilter(filter.get("categoria")));
        }

        if(filter.get("classificacao") != null && !filter.get("classificacao").isEmpty()) {
            sql.append("AND f.classificacao IN (:CLASSIFICACOES) ");
            params.put("CLASSIFICACOES", this.setClassificacaoFilter(filter.get("classificacao")));
        }

        if(filter.get("duracao") != null && !filter.get("duracao").isEmpty()) {
            sql.append("AND f.duracao IN (:DURACOES) ");
            params.put("DURACOES", this.setDuracaoFilter(filter.get("duracao")));
        }

        if(filter.get("status") != null && !filter.get("status").isEmpty()) {
            sql.append("AND f.status IN (:STATUS)");
            params.put("STATUS", this.setStatusFilter(filter.get("status")));
        }

        Query query = this.entityManager.createQuery(sql.toString());
        params.forEach(query::setParameter);

        return query.getResultList();
    }

    public Filme findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Filme create(FilmeRegisterDTO filmeRegisterDTO) {
        var filme = Filme.builder()
                .classificacao(this.setClassificacao(filmeRegisterDTO.classificacao()))
                .dataEstreia(filmeRegisterDTO.dataEstreia())
                .status(this.setStatus(filmeRegisterDTO.status()))
                .build();

        BeanUtils.copyProperties(filmeRegisterDTO, filme);
        return this.repository.save(filme);
    }

    public Filme update(FilmeUpdateDTO filmeUpdateDTO, UUID id) {
        var filmeFound = this.findById(id);
        if(filmeFound == null)
            return null;

        BeanUtils.copyProperties(filmeUpdateDTO, filmeFound);
        filmeFound.setClassificacao(this.setClassificacao(filmeUpdateDTO.classificacao()));
        filmeFound.setStatus(this.setStatus(filmeUpdateDTO.status()));
        return this.repository.save(filmeFound);
    }

    public Boolean inativar(UUID id) {
        var filme = this.findById(id);
        if(filme == null)
            return false;

        this.repository.inativar(id);
        return true;
    }

    public Boolean ativar(UUID id) {
        var filme = this.findById(id);
        if(filme == null)
            return false;

        this.repository.ativar(id);
        return true;
    }

    public boolean delete(UUID id) {
        var filmeFound = this.findById(id);
        if(filmeFound == null)
            return false;

        this.repository.delete(filmeFound);
        return true;
    }

    private Classificacao setClassificacao(String classificacao) {
        return switch (classificacao.toUpperCase()) {
            case "LIVRE" -> Classificacao.LIVRE;
            case "DEZ" -> Classificacao.DEZ;
            case "DOZE" -> Classificacao.DOZE;
            case "QUATORZE" -> Classificacao.QUATORZE;
            case "DEZESSEIS" -> Classificacao.DEZESSEIS;
            case "DEZOITO" -> Classificacao.DEZOITO;
            default -> null;
        };
    }

    private List<Classificacao> setClassificacaoFilter(List<String> params) {
        List<Classificacao> classificacoes = new ArrayList<>();

        for(String param:params) {
            switch (param.toUpperCase()) {
                case "LIVRE": {
                    classificacoes.add(Classificacao.LIVRE);
                    break;
                }
                case "DEZ": {
                    classificacoes.add(Classificacao.DEZ);
                    break;
                }
                case "DOZE": {
                    classificacoes.add(Classificacao.DOZE);
                    break;
                }
                case "QUATORZE": {
                    classificacoes.add(Classificacao.QUATORZE);
                    break;
                }
                case "DEZESSEIS": {
                    classificacoes.add(Classificacao.DEZESSEIS);
                    break;
                }
                case "DEZOITO": {
                    classificacoes.add(Classificacao.DEZOITO);
                    break;
                }
                default: break;
            };
        }

        return classificacoes;
    }

    private List<Categoria> setCategoriaFilter(List<String> params) {
        List<Categoria> categoriasReturn = new ArrayList<>();

        for(Categoria categoria:this.categoriaService.findAll()) {
            for(String param:params) {
                if(param.toUpperCase().equals(categoria.getNome().toUpperCase()))
                    categoriasReturn.add(categoria);
            }
        }

        return categoriasReturn;
    }

    private List<StatusFilme> setStatusFilter(List<String> params) {
        List<StatusFilme> status = new ArrayList<>();

        for(String param:params) {
            switch (param.toUpperCase()) {
                case "CARTAZ" -> {
                    status.add(StatusFilme.CARTAZ);
                    break;
                }
                case "DESTAQUE" -> {
                    status.add(StatusFilme.DESTAQUE);
                    break;
                }
                case "LANCAMENTO" -> {
                    status.add(StatusFilme.LANCAMENTO);
                    break;
                }
                case "ESTREIA" -> {
                    status.add(StatusFilme.ESTREIA);
                    break;
                }
                case "PRE_ESTREIA" -> {
                    status.add(StatusFilme.PRE_ESTREIA);
                    break;
                }
                default -> {
                    break;
                }
            };
        }

        return status;
    }

    private List<Integer> setDuracaoFilter(List<String> params) {
        List<Integer> duracoes = new ArrayList<>();

        for(String param:params) {
            switch (param.toUpperCase()) {
                case "1HR" -> {
                    duracoes.add(60);
                    break;
                }
                case "1HR30" -> {
                    duracoes.add(90);
                    break;
                }
                case "2HR" -> {
                    duracoes.add(120);
                    break;
                }
                case "2HR30" -> {
                    duracoes.add(150);
                    break;
                }
                default -> {
                    break;
                }
            };
        }

        return duracoes;
    }

    private StatusFilme setStatus(String status) {
        return switch (status.toUpperCase()) {
            case "CARTAZ" -> StatusFilme.CARTAZ;
            case "ESTREIA" -> StatusFilme.ESTREIA;
            case "DESTAQUE" -> StatusFilme.DESTAQUE;
            case "PRE_ESTREIA" -> StatusFilme.PRE_ESTREIA;
            case "LANCAMENTO" -> StatusFilme.LANCAMENTO;
            default -> null;
        };
    }
}
