package br.com.codenation.errorcenter.repository;


import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import br.com.codenation.errorcenter.models.Log;


@Repository
public interface LogRepository extends JpaRepository<Log, Long>{


   @Modifying
   @Transactional
   @Query(value = "UPDATE tb_logs SET status=:status WHERE id=:id", nativeQuery = true) 
   public void update(@Param("id") long id, @Param("status") String status);


 



}