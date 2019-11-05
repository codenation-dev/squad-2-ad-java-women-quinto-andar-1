package br.com.codenation.errorcenter.service;

import br.com.codenation.errorcenter.dtos.LogDTO;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public List<Log> findAll() {
        return logRepository.findAll();
    }

    public Optional<?> findById(long id) {
        return logRepository.findById(id);
    }

    public Log saveNewLog(Log log) {
        return logRepository.save(log);
    }

	public void update(List <LogDTO> log) {

        for(LogDTO logs: log){
            logRepository.update(logs.id, logs.status);
        }
	}
}
