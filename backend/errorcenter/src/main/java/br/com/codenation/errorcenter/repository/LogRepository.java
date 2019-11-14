package br.com.codenation.errorcenter.repository;


import java.util.List;

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
	@Query(value = "UPDATE tb_logs SET status=:status WHERE id in (:ids)", nativeQuery = true) 
	public void update(@Param("ids") List<Long> id, @Param("status") String status);

	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND level=:level "
			+ "AND status='ACTIVE'", nativeQuery = true) 
	public List<Log> findByEnvironmentAndLevel(@Param("environment") String environment, @Param("level") String level);


	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs WHERE environment=:environment "
			+ "AND description LIKE %:description% "
			+ "AND status='ACTIVE'", nativeQuery = true) 
	public List<Log> findByEnvironmentAndDescription(@Param("environment") String environment, @Param("description") String description);


	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND origin=:origin "
			+ "AND status='ACTIVE'", nativeQuery = true) 
	public List<Log> findByEnvironmentAndOrigin(@Param("environment") String environment, @Param("origin") String origin);


	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND status='ACTIVE' "
			+ "ORDER BY level ASC", nativeQuery = true) 
	public List<Log> findByEnvironmentOrderByLevel(@Param("environment") String environment);


	@Query(value = "SELECT COUNT(title) AS Frequency, title, level "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND status='ACTIVE' "
			+ "GROUP BY title, level   "
			+ "ORDER BY 1 DESC", nativeQuery = true) 
	public List<Log> findByEnvironmentOrderByFrequency(@Param("environment") String environment);

}