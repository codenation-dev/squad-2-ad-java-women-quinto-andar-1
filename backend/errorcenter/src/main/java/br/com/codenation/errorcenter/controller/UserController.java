package br.com.codenation.errorcenter.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	public ResponseEntity<?> insertUsers(@RequestBody User user){
		userService.save(user);
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody String email, @RequestBody String password) {
		Optional<User> user = userService.login(password, email);
		
		if (user.isPresent()) {
			return ResponseEntity.ok(user);
		}
		
		/*TODO Não sei como tratar isso :( */
		return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.FORBIDDEN); 	
		
	}
}