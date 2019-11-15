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
	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE id=:id ", nativeQuery = true)
	public LogWithDetailsResponseDTO findByLogId(@Param("id") Long id);

	@Modifying
	@Transactional
	@Query(value = "UPDATE tb_logs SET status=:status WHERE id in (:ids)", nativeQuery = true) 
	public void update(@Param("ids") List<Long> ids, @Param("status") String status);

	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND level iLIKE %:level% "
			+ "AND status='ACTIVE' "
			+ "ORDER BY event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndLevel(@Param("environment") String environment, @Param("level") String level);

	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND description iLIKE %:description% "
			+ "AND status='ACTIVE' "
			+ "ORDER BY event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndDescription(@Param("environment") String environment, @Param("description") String description);

	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND origin iLIKE %:origin% "
			+ "AND status='ACTIVE' "
			+ "ORDER BY event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndOrigin(@Param("environment") String environment, @Param("origin") String origin);

    @Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
            + "FROM tb_logs "
            + "WHERE environment=:environment "
            + "AND status='ACTIVE' "
            + "ORDER BY event_date DESC", nativeQuery = true)
    public List<LogResponseDTO> findByEnvironmentAndOrderByDate(String environment);

	@Query(value = "SELECT id, title, description, environment, event_date, level, origin, status, user_id "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND status='ACTIVE' "
			+ "ORDER BY "
			+ "CASE WHEN level='FATAL' THEN 0 "
			+ "WHEN level='ERROR' THEN 1 "
			+ "WHEN level='WARN' THEN 2 "
			+ "WHEN level='DEBUG' THEN 3 "
			+ "WHEN level='INFO' THEN 4 "
			+ "END ASC, "
			+ "event_date DESC", nativeQuery = true)
	public List<LogResponseDTO> findByEnvironmentAndOrderByLevel(@Param("environment") String environment);

	@Query(value = "SELECT title, COUNT(title) as frequency, description, origin, level "
			+ "FROM tb_logs "
			+ "WHERE environment=:environment "
			+ "AND status='ACTIVE' "
			+ "GROUP BY title, level, description, origin "
			+ "ORDER BY frequency DESC", nativeQuery = true)
	public List<LogWithFrequencyResponseDTO> findByEnvironmentAndOrderByFrequency(@Param("environment") String environment);

}