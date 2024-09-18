package com.tcc.cinematic.service;

import com.tcc.cinematic.DTO.SessaoRecordDTO;
import com.tcc.cinematic.entity.*;
import com.tcc.cinematic.enums.*;
import com.tcc.cinematic.repository.SessaoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class SessaoService {
    @Autowired
    private SessaoRepository repository;

    @Autowired
    private AssentoService assentoService;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Sessao> findAll() {
        return this.repository.findAll();
    }

    public Sessao findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public List<Sessao> filters(Map<String, List<String>> filter) {
        if(filter == null || filter.isEmpty())
            return null;

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT s FROM Sessao s WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();

        if(filter.get("periodo") != null && !filter.get("periodo").isEmpty()) {
            sql.append("AND s.horario.periodo IN (:PERIODOS) ");
            params.put("PERIODOS", this.setPeriodos(filter.get("periodo")));
        }

        if(filter.get("status") != null && !filter.get("status").isEmpty()) {
            sql.append("AND s.disponibilidade IN (:STATUS) ");
            params.put("STATUS", this.setDisponibilidade(filter.get("status")));
        }

        if(filter.get("tipo") != null && !filter.get("tipo").isEmpty()) {
            sql.append("AND s.tipo IN (:TIPOS)");
            params.put("TIPOS", this.setTipoFilter(filter.get("tipo")));
        }

        if(filter.get("idioma") != null && !filter.get("idioma").isEmpty()) {
            sql.append("AND s.idioma IN (:IDIOMAS)");
            params.put("IDIOMAS", this.setIdiomaFilter(filter.get("idioma")));
        }

        if (filter.get("estabelecimento")!=null && !filter.get("estabelecimento").isEmpty()){
            sql.append("AND s.estabelecimento IN (:ESTABELECIMENTOS)");
            params.put("ESTABELECIMENTOS", filter.get("estabelecimento"));
        }

        Query query = this.entityManager.createQuery(sql.toString());
        params.forEach(query::setParameter);

        return query.getResultList();
    }

    public Sessao create(SessaoRecordDTO sessaoParams) {
        var sessao = Sessao.builder()
                .tipo(this.setTipo(sessaoParams.tipo()))
                .idioma(this.setIdioma(sessaoParams.idioma()))
                .assentos(this.gerarAssentos(sessaoParams.sala()))
                .build();

        BeanUtils.copyProperties(sessaoParams, sessao);
        sessao.setTipo(this.setTipo(sessaoParams.tipo()));
        return this.repository.save(sessao);
    }

    public Sessao update(SessaoRecordDTO sessaoRecordDTO, UUID id) {
        var sessaoFound = this.findById(id);
        if(sessaoFound == null)
            return null;

        if(!sessaoRecordDTO.tipo().isEmpty())
            sessaoFound.setTipo(this.setTipo(sessaoRecordDTO.tipo()));

        if(!sessaoRecordDTO.idioma().isEmpty())
            sessaoFound.setIdioma(this.setIdioma(sessaoRecordDTO.idioma()));

        BeanUtils.copyProperties(sessaoRecordDTO, sessaoFound);
        return this.repository.save(sessaoFound);
    }

    public boolean inativar(UUID id) {
        var sessao = this.findById(id);
        if(sessao == null)
            return false;

        this.repository.inativar(id);
        return true;
    }

    public boolean ativar(UUID id) {
        var sessao = this.findById(id);
        if(sessao == null)
            return false;

        this.repository.ativar(id);
        return true;
    }

    public boolean delete(UUID id) {
        var sessaoFound = this.findById(id);
        if(sessaoFound == null)
            return false;

        this.repository.delete(sessaoFound);
        return true;
    }

    private TipoSessao setTipo(String tipo) {
        return switch (tipo.toUpperCase()) {
            case "2D" -> TipoSessao.A;
            case "3D" -> TipoSessao.B;
            case "4D" -> TipoSessao.C;
            case "D-BOX" -> TipoSessao.D;
            default -> null;
        };
    }

    private List<TipoSessao> setTipoFilter(List<String> tipos) {
        List<TipoSessao> tiposList = new ArrayList<>();

        for(String str:tipos) {
            switch (str.toUpperCase()) {
                case "2D": {
                    tiposList.add(TipoSessao.A);
                    break;
                }
                case "3D": {
                    tiposList.add(TipoSessao.B);
                    break;
                }
                case "4D": {
                    tiposList.add(TipoSessao.C);
                    break;
                }
                case "D-BOX": {
                    tiposList.add(TipoSessao.D);
                    break;
                }
                default: {
                    break;
                }
            }
        }

        return tiposList;
    }

    private List<Idioma> setIdiomaFilter(List<String> idiomas) {
        List<Idioma> idiomasList = new ArrayList<>();

        for(String str:idiomas) {
            switch (str.toUpperCase()) {
                case "LEGENDADO": {
                    idiomasList.add(Idioma.LEGENDADO);
                    break;
                }
                case "DUBLADO": {
                    idiomasList.add(Idioma.DUBLADO);
                    break;
                }
                case "NORMAL": {
                    idiomasList.add(Idioma.NORMAL);
                    break;
                }
                default: {
                    break;
                }
            }
        }

        return idiomasList;
    }

    private Idioma setIdioma(String idioma) {
        return switch (idioma.toUpperCase()) {
            case "DUBLADO" -> Idioma.DUBLADO;
            case "LEGENDADO" -> Idioma.LEGENDADO;
            case "NORMAL" -> Idioma.NORMAL;
            default -> null;
        };
    }

    private List<Periodo> setPeriodos(List<String> periodosParams) {
        List<Periodo> periodos = new ArrayList<>();

        for(String hora:periodosParams) {
            switch (hora.toUpperCase()) {
                case "MANHA": {
                    periodos.add(Periodo.MANHA);
                    break;
                }
                case "TARDE": {
                    periodos.add(Periodo.TARDE);
                    break;
                }
                case "NOITE": {
                    periodos.add(Periodo.NOITE);
                    break;
                }
                default: {
                    break;
                }
            };
        }

        return periodos;
    }

    private List<Boolean> setDisponibilidade(List<String> status) {
        List<Boolean> disponibilidades = new ArrayList<>();

        for(String str:status) {
            if(str.equalsIgnoreCase("ATIVO"))
                disponibilidades.add(true);

            if(str.equalsIgnoreCase("INATIVO"))
                disponibilidades.add(false);
        }

        return disponibilidades;
    }

    private List<Assento> gerarAssentos(Sala sala) {
        var assentos = new ArrayList<Assento>();
        for(var fileira:sala.getFileiras()) {
            for(var i=0;i<sala.getQuantidadeColunas();i++) {
                var assento = this.assentoService.create(Assento.builder()
                                .nome(fileira+(i+1))
                                .status(StatusAssento.DISPONIVEL)
                                .tipo(TipoAssento.NORMAL)
                                .build());

                assentos.add(assento);
            }
        }

        return assentos;
    }
}
