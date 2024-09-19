package com.tcc.cinematic.service;

import com.tcc.cinematic.entity.Estabelecimento;
import com.tcc.cinematic.repository.EstabelecimentoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class EstabelecimentoService {
    @Autowired
    private EstabelecimentoRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Estabelecimento> findAll() {
        return this.repository.findAll();
    }

    public Estabelecimento findById(UUID id) {
        return this.repository.findById(id).orElse(null);
    }

    public Estabelecimento create(Estabelecimento estabelecimento) {
        return this.repository.save(estabelecimento);
    }

    public List<Estabelecimento> filtro(Map<String, List<String>> filtro) {

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT e FROM Estabelecimento e WHERE 1=1 ");
        Map<String, Object> params = new HashMap<>();

        if(filtro.get("estado") != null && !filtro.get("estado").isEmpty()) {
            sql.append("AND e.estado ILIKE :ESTADO ");
            params.put("ESTADO", "%"+filtro.get("estado").getFirst().toUpperCase()+"%");
        }

        if(filtro.get("cidade") != null && !filtro.get("cidade").isEmpty()) {
            sql.append("AND e.cidade ILIKE :CIDADE ");
            params.put("CIDADE", "%"+filtro.get("cidade").getFirst()+"%");
        }

        if(filtro.get("cep") != null && !filtro.get("cep").isEmpty()) {
            sql.append("AND e.cep = :CEP");
            params.put("CEP", filtro.get("cep").getFirst());
        }

        Query query = this.entityManager.createQuery(sql.toString());
        params.forEach(query::setParameter);

        return query.getResultList();
    }

    public Estabelecimento update(Estabelecimento estabelecimento) {
        var estabelecimentoFound = this.findById(estabelecimento.getId());
        if(estabelecimentoFound == null)
            return null;

        BeanUtils.copyProperties(estabelecimento, estabelecimentoFound);
        return this.repository.save(estabelecimentoFound);
    }

    public boolean delete(UUID id) {
        var estabelecimentoFound = this.findById(id);
        if(estabelecimentoFound == null)
            return false;

        this.repository.delete(estabelecimentoFound);
        return true;
    }

    public List<Estabelecimento> findByNome(String nome){
        nome = "%"+nome+"%";
        return this.repository.findByNomeLike(nome);
    }
}
