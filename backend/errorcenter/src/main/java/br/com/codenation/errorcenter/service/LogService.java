package br.com.codenation.errorcenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.codenation.errorcenter.dtos.requests.ChangeLogStatusRequestDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithDetailsResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithFrequencyResponseDTO;
import br.com.codenation.errorcenter.exception.ResourceNotFoundException;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.repository.LogRepository;

@Service
@Transactional
public class LogService {
    @Autowired
	private LogRepository logRepository;

    public LogWithDetailsResponseDTO getLogById(Long id) {
		LogWithDetailsResponseDTO log = logRepository.findByLogId(id);

		if (log != null) {
			return log;
		} else {
			throw new ResourceNotFoundException("ERROR_LOG_FIND");
		}
    }

    public Log saveNewLog(Log log) {
			return logRepository.save(log);
    }

	public void update(ChangeLogStatusRequestDTO logs) {

		if (logs.ids != null) {
			logRepository.update(logs.ids, logs.status);
		} else {
			throw new ResourceNotFoundException("ERROR_LOG_CHANGE_STATUS_ID");
		}
    }
	
    public List<LogResponseDTO> findByEnvironment(String environment, String filter, String value) {

		if (filter.equals("level")) {
			return logRepository.findByEnvironmentAndLevel(environment, value);

		} else if (filter.equals("description")){
			return logRepository.findByEnvironmentAndDescription(environment, value);

		} else if (filter.equals("origin")){
			return logRepository.findByEnvironmentAndOrigin(environment, value);
		}

		throw new ResourceNotFoundException("ERROR_NOT_FOUND");
	}

	public List<LogResponseDTO> findByEnvironmentAndOrderByDate(String environment) {
		return logRepository.findByEnvironmentAndOrderByDate(environment);
	}

	public List<LogWithFrequencyResponseDTO> findByEnvironmentAndOrderByFrequency(String environment) {
		return logRepository.findByEnvironmentAndOrderByFrequency(environment);
	}

	public List<LogResponseDTO> findByEnvironmentAndOrderByLevel(String environment) {
		return logRepository.findByEnvironmentAndOrderByLevel(environment);
	}
    
}
