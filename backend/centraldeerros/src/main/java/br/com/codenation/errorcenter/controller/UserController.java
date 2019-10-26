package br.com.codenation.errorcenter.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping("/")
	public ResponseEntity<?> getAllUsers(){
		List<User> user = userService.findAll();
		
		if(!user.isEmpty()) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") Long id){
		Optional<User> user = userService.findById(id);
		
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<?> getUserById(@PathVariable("id") Long id){
		Optional<User> user = userService.findById(id);
		
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<?> getUserByName(@PathVariable("name") String name){
		Optional<User> user = userService.findByName(name);
		
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/")
	public ResponseEntity<?> insertUser(@RequestBody User user){
		userService.save(user);
		return ResponseEntity.ok(user);
	}

	@PostMapping("/")
	public ResponseEntity<?> insertAllUsers(@RequestBody List<User> user){
		userService.saveAll(user);
		return ResponseEntity.ok(user);
	}
}