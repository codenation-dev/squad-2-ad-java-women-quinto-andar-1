package br.com.codenation.errorcenter.controller;


import br.com.codenation.errorcenter.dtos.LogRequestDTO;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.repository.UserRepository;
import br.com.codenation.errorcenter.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

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
        Log newLog = logService.saveNewLog(log);
        return ResponseEntity.ok("Log inserido com sucesso!");
    }

    @PatchMapping("/status")
    public ResponseEntity<?> changeStatus(@RequestBody LogRequestDTO logs) throws Exception { 
        logService.update(logs);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}