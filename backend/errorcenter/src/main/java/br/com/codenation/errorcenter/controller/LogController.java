package br.com.codenation.errorcenter.controller;

import br.com.codenation.errorcenter.dtos.LogDTO;
import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/logs")
public class LogController {
    @Autowired
    private LogService logService;

    @GetMapping
    public ResponseEntity<?> getLogs() throws Exception {
        return new ResponseEntity<>(logService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Optional<?> getLogById(@PathVariable("id") Long id) {
        return logService.findById(id); 
    }

    @PostMapping
    public ResponseEntity<?> addNewLog(HttpServletRequest request, @RequestBody Log log) throws Exception {
        Log newLog = logService.saveNewLog(log);
        return ResponseEntity.ok(newLog);
}

    @PatchMapping("/change-status")
    public ResponseEntity<?> changeStatus(@RequestBody List <LogDTO> log) throws Exception { 
        logService.update(log);
        return new ResponseEntity<>(HttpStatus.OK);
}
}