package br.com.codenation.errorcenter.controller;


import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import br.com.codenation.errorcenter.dtos.ChangeLogStatusRequestDto;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.service.LogService;


@RestController
@RequestMapping("/log")
public class LogController {
    @Autowired
    private LogService logService;

    @GetMapping
    public ResponseEntity<?> getLogs() throws Exception {
        return new ResponseEntity<>(logService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogById(@PathVariable("id") Long id) throws Exception{
        return new ResponseEntity<>(logService.findById(id), HttpStatus.OK); 
    }

    @PostMapping
    public ResponseEntity<?> addNewLog(HttpServletRequest request, @RequestBody Log log) throws Exception {
        logService.saveNewLog(log);
        return ResponseEntity.ok("Log inserido com sucesso!");
    }

    @PatchMapping("/status")
    public ResponseEntity<?> changeStatus(@RequestBody ChangeLogStatusRequestDto logs) throws Exception {
        logService.update(logs);
        return ResponseEntity.ok("Status alterado!");
    }
    
    @GetMapping("/{environment}/{search-filter}/{value-filter}")
    public ResponseEntity<?> findByEnvironment(HttpServletRequest request, @PathVariable("environment") String environment, @PathVariable("search-filter") String search_filter, @PathVariable("value-filter") String value_filter) throws Exception {
        Optional<Log> logs = logService.findByEnvironment(environment, search_filter, value_filter);
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/{environment}/{order-by}")
    public ResponseEntity<?> findByEnvironmentOrderBy(HttpServletRequest request, @PathVariable("environment") String environment, @PathVariable("order-by") String order_by) throws Exception {
        Optional<Log> logs = logService.findByEnvironmentOrderBy(environment, order_by);
        return ResponseEntity.ok(logs);
    }  
}