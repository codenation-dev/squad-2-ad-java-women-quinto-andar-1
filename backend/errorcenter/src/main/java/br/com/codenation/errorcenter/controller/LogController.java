package br.com.codenation.errorcenter.controller;


import br.com.codenation.errorcenter.dtos.ChangeLogStatusRequestDto;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.service.LogService;
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
    public ResponseEntity<?> changeStatus(@RequestBody ChangeLogStatusRequestDto logs) throws Exception {
        logService.update(logs);
        return ResponseEntity.ok("Status alterado!");
    }
}