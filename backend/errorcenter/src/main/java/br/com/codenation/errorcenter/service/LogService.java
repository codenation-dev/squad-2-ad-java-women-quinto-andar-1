package br.com.codenation.errorcenter.service;

import br.com.codenation.errorcenter.dtos.requests.ChangeLogStatusRequestDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithDetailsResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithFrequencyResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogResponseDTO;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LogService {
    @Autowired
	private LogRepository logRepository;

    public LogWithDetailsResponseDTO getLogById(Long id) throws Exception {
		LogWithDetailsResponseDTO log = logRepository.findByLogId(id);

		if (log != null) {
			return log;
		} else {
			/*TODO Retornar Exception no padrão da Jeise "log não encontrado"*/
			throw new Exception("Log não encontrado");
		}
    }

    public Log saveNewLog(Log log) {
        // TODO fazer as verificações para prever erros ao salvar o log
        return logRepository.save(log);
    }

	public void update(ChangeLogStatusRequestDTO logs) {
        logRepository.update(logs.ids, logs.status);
    }
	
    public List<LogResponseDTO> findByEnvironment(String environment, String filter, String value) {

		if (filter.equals("level")) {
			return logRepository.findByEnvironmentAndLevel(environment, value);

		} else if (filter.equals("description")){
			return logRepository.findByEnvironmentAndDescription(environment, value);

		} else if (filter.equals("origin")){
			return logRepository.findByEnvironmentAndOrigin(environment, value);
		}

		return null;
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
