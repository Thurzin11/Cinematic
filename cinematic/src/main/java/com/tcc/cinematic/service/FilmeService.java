package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.FilmeFilterParams;
import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.DTO.FilmeUpdateDTO;
import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import com.tcc.cinematic.repository.FilmeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.query.criteria.HibernateCriteriaBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    private List<Filme> findByCategoria(Categoria categoria) {
        return this.repository.findByCategoria(categoria);
    }

    private List<Filme> findByClassificacao(Classificacao classificacao) {
        return this.repository.findByClassificacao(classificacao);
    }

    private List<Filme> findByDuracao(String duracaoFiltro) {
        int duracao = this.setDuracao(duracaoFiltro);
        if(duracao == 0)
            return this.repository.findByDuracaoGreaterThan(150);

        return this.repository.findByDuracaoLessThanEqual(duracao);
    }

    private List<Filme> findByStatus(StatusFilme status) {
        return this.repository.findByStatus(status);
    }

    public List<Filme> filters(FilmeFilterParams filterParams) {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT f FROM Filme f WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();

        if(filterParams.categorias() != null && !filterParams.categorias().isEmpty()) {
            sql.append("AND f.categoria IN (:CATEGORIAS) ");
            params.put("CATEGORIAS", filterParams.categorias());
        }

        if(filterParams.classificacoes() != null && !filterParams.classificacoes().isEmpty()) {
            sql.append("AND f.classificacao IN (:CLASSIFICACOES) ");
            params.put("CLASSIFICACOES", this.setClassificacoes(filterParams.classificacoes()));
        }

        if(filterParams.duracoes() != null && !filterParams.duracoes().isEmpty()) {
            sql.append("AND f.duracao IN (:DURACOES) ");
            params.put("DURACOES", filterParams.duracoes());
        }

        if(filterParams.status() != null && !filterParams.status().isEmpty()) {
            sql.append("AND f.status IN (:STATUS)");
            params.put("STATUS", filterParams.status());
        }

        Query query = this.entityManager.createQuery(sql.toString());
        params.forEach(query::setParameter);

        return query.getResultList();
    }

    private void addFilmeToList(List<Filme> listFilme, List<Filme> listFilmParam) {
        for(var filme:listFilmParam) {
            if(!listFilme.contains(filme))
                listFilme.add(filme);
        }
    }

    private Categoria setCategoria(String nomeCategoria) {
        return this.categoriaService.findByNome(nomeCategoria);
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

    private List<Classificacao> setClassificacoes(List<String> classificacoesParam) {
        List<Classificacao> classificacoes = new ArrayList<>();

        for(String classificacao:classificacoesParam) {
            switch (classificacao.toUpperCase()) {
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

    private StatusFilme setStatus(String status) {
        return switch (status.toUpperCase()) {
            case "CARTAZ" -> StatusFilme.CARTAZ;
            case "DESTAQUE" -> StatusFilme.DESTAQUE;
            case "LANCAMENTO" -> StatusFilme.LANCAMENTO;
            case "ESTREIA" -> StatusFilme.ESTREIA;
            case "PRE_ESTREIA" -> StatusFilme.PRE_ESTREIA;
            default -> null;
        };
    }

    private int setDuracao(String duracao) {
        return switch (duracao.toUpperCase()) {
            case "1HR" -> 60;
            case "1HR30" -> 90;
            case "2HR" -> 120;
            case "2HR30" -> 150;
            default -> 0;
        };
    }
}
