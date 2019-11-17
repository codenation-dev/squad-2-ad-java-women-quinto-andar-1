package br.com.codenation.errorcenter.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import br.com.codenation.errorcenter.dtos.responses.projections.LogWithFrequencyResponseDTO;
import br.com.codenation.errorcenter.dtos.responses.projections.LogResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.codenation.errorcenter.dtos.requests.ChangeLogStatusRequestDTO;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.service.LogService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/log")
public class LogController {
    @Autowired
    private LogService logService;

    // Exemplo: {url-base}/log?id=9
    @GetMapping
    public ResponseEntity<?> getLogById(@RequestParam("id") Long id) throws Exception {
        return new ResponseEntity<>(logService.getLogById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNewLog(HttpServletRequest request, @RequestBody Log log) throws Exception {
        logService.saveNewLog(log);
        return ResponseEntity.ok("Log inserido com sucesso!");
    }

    @PatchMapping("/status")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeLogStatusRequestDTO logs) throws Exception {
        logService.update(logs);
        return ResponseEntity.ok("Status alterado!");
    }

    // Exemplo: {url-base}/log/prod
    @GetMapping("/{environment}")
    public ResponseEntity<?> getLogsByEnvironment(HttpServletRequest request, @PathVariable("environment") String environment) {
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
                                                                @RequestParam(value = "value", required = true) String value) throws Exception {
        String upperCaseEnvironment = environment.toUpperCase();
        List<LogResponseDTO> logs = logService.findByEnvironment(upperCaseEnvironment, filter, value);
        return ResponseEntity.ok(logs);
    }

    // Exemplo com level: {url-base}/log/prod?order=level
    // Exemplo com frequency: {url-base}/log/prod?order=frequency
    @GetMapping(value = "/{environment}", params = "order")
    public ResponseEntity<?> getLogsByEnvironmentWithOrderBy(HttpServletRequest request,
                                                             @PathVariable("environment") String environment,
                                                             @RequestParam(value = "order", required = true) String order) throws Exception {
        String upperCaseEnvironment = environment.toUpperCase();
        if (order.equals("frequency")) {
            List<LogWithFrequencyResponseDTO> logs = logService.findByEnvironmentAndOrderByFrequency(upperCaseEnvironment);
            return ResponseEntity.ok(logs);
        }

        List<LogResponseDTO> logs = logService.findByEnvironmentAndOrderByLevel(upperCaseEnvironment);
        return ResponseEntity.ok(logs);
    }
}