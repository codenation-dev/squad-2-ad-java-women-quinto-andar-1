package br.com.codenation.errorcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.codenation.errorcenter.models.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Long>{

}