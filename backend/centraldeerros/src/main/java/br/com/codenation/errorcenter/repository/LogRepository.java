package br.com.codenation.errorcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codenation.errorcenter.models.Log;

public interface LogRepository extends JpaRepository<Log, Long>{

}