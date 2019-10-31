package br.com.codenation.errorcenter.service;

import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService {
    @Autowired
    private LogRepository logRepository;

    public Log saveNewLog(Log log) {
        return logRepository.save(log);
    }
}
