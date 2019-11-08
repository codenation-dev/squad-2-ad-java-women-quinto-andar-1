package br.com.codenation.errorcenter.service;

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

    public List<?> findAll() {
        return null;
    }

    public Optional<?> findById(long id) {
        return Optional.empty();
    }

    public Log saveNewLog(Log log) {
        // TODO fazer as verificações para prever erros ao salvar o log
        return logRepository.save(log);
    }
}
