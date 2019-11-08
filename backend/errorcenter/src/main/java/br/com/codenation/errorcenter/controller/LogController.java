package br.com.codenation.errorcenter.controller;

import br.com.codenation.errorcenter.models.Log;
import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.repository.UserRepository;
import br.com.codenation.errorcenter.service.LogService;
import br.com.codenation.errorcenter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/log")
public class LogController {
    @Autowired
    private LogService logService;

    @Autowired
    private UserRepository userRepository;
  
    @GetMapping
    public ResponseEntity<?> getLogs(HttpServletRequest request) throws Exception {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogById(HttpServletRequest request, @PathVariable("id") String id) throws Exception {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> addNewLog(HttpServletRequest request, @RequestBody Log log) throws Exception {
        Optional<User> user = userRepository.findById(log.getId());

        if (user.isPresent()) {
            log.setId(user.get().getId());
            Log newLog = logService.saveNewLog(log);
            return ResponseEntity.ok(newLog);
        }

        throw new Exception("usuário não encontrado");
    }
}