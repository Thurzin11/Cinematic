package com.tcc.cinematic.service;


import com.tcc.cinematic.DTO.HorarioRegisterDTO;
import com.tcc.cinematic.entity.Horario;
import com.tcc.cinematic.enums.Periodo;
import com.tcc.cinematic.repository.HorarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository repository;
    @PersistenceContext
    private EntityManager entityManager;

    public List<Horario> findAll() { return this.repository.findAll();}

    public Horario findById(UUID id) { return this.repository.findById(id).orElse(null);}

    public Horario create(HorarioRegisterDTO horarioDTO){
        Horario horario = Horario.builder().hora(horarioDTO.hora()).periodo(this.setPeriodo(horarioDTO.periodo())).build();
        return this.repository.save(horario);
    }

    public List<Horario> filtro(Map<String, List<String>> filtro){
        if (filtro == null || filtro.isEmpty())
            return null;

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT h FROM Horario h WHERE 1=1 ");
        Map<String, Object> parans = new HashMap<>();

        if (filtro.get("periodo") != null && !filtro.get("periodo").isEmpty()) {
            sql.append("AND h.periodo IN (:PERIODOS) ");
            parans.put("PERIODOS",this.setPeriodoFilter(filtro.get("periodo")));
        }

        if (filtro.get("status") != null && !filtro.get("status").isEmpty()) {
            sql.append("AND h.status IN (:STATUS) ");
            parans.put("STATUS",this.setStatus(filtro.get("status")));
        }

        Query query = this.entityManager.createQuery(sql.toString());
        parans.forEach(query::setParameter);

        return query.getResultList();
    }

    public Horario update(Horario horario){
        var horarioFound = this.findById(horario.getId());
        if (horarioFound == null){
            return null;
        }
        BeanUtils.copyProperties(horario, horarioFound);
        return this.repository.save(horarioFound);
    }

    public boolean delete(UUID id) {
        var horarioFound = this.findById(id);
        if (horarioFound == null){
            return false;
        }
        this.repository.delete(horarioFound);
        return true;
    }

    public boolean inativar(UUID id){
        var horarioFound = this.findById(id);
        if (horarioFound == null){
            return false;
        }
        this.repository.inativar(id);
        return true;
    }

    public boolean ativar(UUID id){
        var horarioFound = this.findById(id);
        if (horarioFound == null){
            return false;
        }
        this.repository.ativar(id);
        return true;
    }

    private Periodo setPeriodo(String periodo) {
        return switch (periodo.toUpperCase()) {
            case "MANHA" -> Periodo.MANHA;
            case "TARDE" -> Periodo.TARDE;
            case "NOITE" -> Periodo.NOITE;
            default -> null;
        };
    }

    private List<Periodo> setPeriodoFilter(List<String> periodosParams){
        List<Periodo> periodos = new ArrayList<>();
        for (String str: periodosParams){
            switch (str.toUpperCase()){
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
                default : {
                    break;
                }
            };
        }
        return periodos;

    }

    private List<Boolean> setStatus(List<String> statusParams){
        List<Boolean> statusList = new ArrayList<>();
        for (String str: statusParams){
            switch (str.toUpperCase()){
                case "ATIVO": {
                    statusList.add(true);
                    break;
                }
                case "INATIVO": {
                    statusList.add(false);
                    break;
                }
                default : {
                    break;
                }
            };
        }
        return statusList;

    }

}
