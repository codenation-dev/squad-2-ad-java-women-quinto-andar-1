package br.com.codenation.errorcenter.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.codenation.errorcenter.dtos.requests.ChangeLogStatusRequestDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogWithFrequencyResponseDTO;
import br.com.codenation.errorcenter.exception.ResourceNotFoundException;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.service.LogService;


@RestController
@RequestMapping("/log")
public class LogController {
    @Autowired
    private LogService logService;

    // Exemplo: {url-base}/log?id=9
    @GetMapping
    public ResponseEntity<?> getLogById(@RequestParam("id") Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(logService.getLogById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNewLog(HttpServletRequest request, @RequestBody Log log) throws ResourceNotFoundException {
        logService.saveNewLog(log);
        return ResponseEntity.ok("Log inserido com sucesso!");
    }

    @PatchMapping("/status")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeLogStatusRequestDTO logs) throws ResourceNotFoundException {
        logService.update(logs);
        return ResponseEntity.ok("Status alterado!");
    }

    // Exemplo: {url-base}/log/prod
    @GetMapping("/{environment}")
    public ResponseEntity<?> getLogsByEnvironment(HttpServletRequest request, @PathVariable("environment") String environment) throws ResourceNotFoundException {
        String upperCaseEnvironment = environment.toUpperCase();
        List<LogResponseDTO> logs = logService.findByEnvironmentAndOrderByDate(upperCaseEnvironment);
        return ResponseEntity.ok(logs);
    }

    // Exemplo com origin: {url-base}/log/prod?filter=origin&value=site
    // Exemplo com level: {url-base}/log/prod?filter=level&value=error
    // Exemplo com description: {url-base}/log/prod?filter=description&value=banco
    @GetMapping(value = "/{environment}", params = {"filter", "value"})
    public ResponseEntity<?> getLogsByEnvironmentAndSearchQuery(HttpServletRequest request,
                                                                @PathVariable("environment") String environment,
                                                                @RequestParam(value = "filter", required = true) String filter,
                                                                @RequestParam(value = "value", required = true) String value) throws ResourceNotFoundException {
        String upperCaseEnvironment = environment.toUpperCase();
        List<LogResponseDTO> logs = logService.findByEnvironment(upperCaseEnvironment, filter, value);
        return ResponseEntity.ok(logs);
    }

    // Exemplo com level: {url-base}/log/prod?order=level
    // Exemplo com frequency: {url-base}/log/prod?order=frequency
    @GetMapping(value = "/{environment}", params = "order")
    public ResponseEntity<?> getLogsByEnvironmentWithOrderBy(HttpServletRequest request,
                                                             @PathVariable("environment") String environment,
                                                             @RequestParam(value = "order", required = true) String order) throws ResourceNotFoundException {
        String upperCaseEnvironment = environment.toUpperCase();
        if (order.equals("frequency")) {
            List<LogWithFrequencyResponseDTO> logs = logService.findByEnvironmentAndOrderByFrequency(upperCaseEnvironment);
            return ResponseEntity.ok(logs);
        }

        List<LogResponseDTO> logs = logService.findByEnvironmentAndOrderByLevel(upperCaseEnvironment);
        return ResponseEntity.ok(logs);
    }
}