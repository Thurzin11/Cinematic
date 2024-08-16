package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.FilmeRegisterDTO;
import com.tcc.cinematic.DTO.FilmeUpdateDTO;
import com.tcc.cinematic.entity.Categoria;
import com.tcc.cinematic.entity.Filme;
import com.tcc.cinematic.enums.Classificacao;
import com.tcc.cinematic.enums.StatusFilme;
import com.tcc.cinematic.repository.FilmeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FilmeService {
    @Autowired
    private FilmeRepository repository;

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

    public List<Filme> filters(Map<String, List<String>> filters) {
        List<Filme> filmes = new ArrayList<>();

        filters.forEach((key, value) -> {
            switch (key.toUpperCase()) {
                case "CATEGORIA": {
                    System.out.println(value);
                    for(var str:value)
                        filmes.addAll(this.findByCategoria(this.setCategoria(str)));

                    break;
                }
                case "CLASSIFICACAO": {
                    for(var str:value)
                        filmes.addAll(this.findByClassificacao(this.setClassificacao(str)));

                    break;
                }
                case "DURACAO": {
                    for(var str:value)
                        filmes.addAll(this.findByDuracao(str));

                    break;
                }
                case "STATUS": {
                    for(var str:value)
                        filmes.addAll(this.findByStatus(this.setStatus(str)));

                    break;
                }
                default: break;
            }
        });

        return filmes;
    }

    private Categoria setCategoria(String nomeCategoria) {
        return this.categoriaService.findByNome(nomeCategoria);
    }

    public Filme findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Filme create(FilmeRegisterDTO filmeRegisterDTO) {
        var format = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        var filme = Filme.builder()
                .classificacao(this.setClassificacao(filmeRegisterDTO.classificacao()))
                .dataEstreia(LocalDate.parse(filmeRegisterDTO.dataEstreia(), format))
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
