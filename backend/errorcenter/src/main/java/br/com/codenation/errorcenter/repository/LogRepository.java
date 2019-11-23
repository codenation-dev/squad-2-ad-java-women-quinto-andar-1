package br.com.codenation.errorcenter.repository;


import java.util.List;

import javax.transaction.Transactional;

import br.com.codenation.errorcenter.dtos.responses.projections.LogWithDetailsResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithFrequencyResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.codenation.errorcenter.models.Log;


@Repository
public interface LogRepository extends JpaRepository<Log, Long>{
	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
			+ "WHERE l.id=:ids ", nativeQuery = true)
	public LogWithDetailsResponseDTO findByLogId(@Param("ids") Long id);

	@Modifying
	@Transactional
	@Query(value = "UPDATE tb_logs SET status=:status WHERE id in (:ids)", nativeQuery = true) 
	public void update(@Param("ids") List<Long> ids, @Param("status") String status);

	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
			+ "WHERE l.environment=:environment "
			+ "AND l.level iLIKE %:level% "
			+ "AND l.status='ACTIVE' "
			+ "ORDER BY l.event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndLevel(@Param("environment") String environment, @Param("level") String level);

	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
			+ "WHERE l.environment=:environment "
			+ "AND l.description iLIKE %:description% "
			+ "AND l.status='ACTIVE' "
			+ "ORDER BY l.event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndDescription(@Param("environment") String environment, @Param("description") String description);

	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
			+ "WHERE l.environment=:environment "
			+ "AND l.origin iLIKE %:origin% "
			+ "AND l.status='ACTIVE' "
			+ "ORDER BY l.event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndOrigin(@Param("environment") String environment, @Param("origin") String origin);

	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
            + "WHERE l.environment=:environment "
            + "AND l.status='ACTIVE' "
            + "ORDER BY l.event_date DESC", nativeQuery = true)
    public List<LogResponseDTO> findByEnvironmentAndOrderByDate(String environment);

	@Query(value = "SELECT l.id, l.title, l.description, l.environment, l.event_date, l.level, l.origin, l.status, u.tokenAccess "
			+ "FROM tb_logs as l "
			+ "INNER JOIN tb_user as u on l.user_id = u.id "
			+ "WHERE l.environment=:environment "
			+ "AND l.status='ACTIVE' "
			+ "ORDER BY "
			+ "CASE WHEN l.level='FATAL' THEN 0 "
			+ "WHEN l.level='ERROR' THEN 1 "
			+ "WHEN l.level='WARN' THEN 2 "
			+ "WHEN l.level='INFO' THEN 3 "
			+ "WHEN l.level='DEBUG' THEN 4 "
			+ "END ASC, "
			+ "l.event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndOrderByLevel(@Param("environment") String environment);

	@Query(value = "SELECT title, COUNT(title) as frequency, description, origin, level "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND status='ACTIVE' "
			+ "GROUP BY title, level, description, origin "
			+ "ORDER BY frequency DESC", nativeQuery = true)
	public List<LogWithFrequencyResponseDTO> findByEnvironmentAndOrderByFrequency(@Param("environment") String environment);

}