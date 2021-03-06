package br.com.codenation.errorcenter.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.codenation.errorcenter.dtos.requests.UserLoginRequestDTO;
import br.com.codenation.errorcenter.dtos.responses.LoggedUserResponseDTO;
import br.com.codenation.errorcenter.exception.ResourceNotFoundException;
import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	public ResponseEntity<?> insertUsers(@RequestBody User user) throws ResourceNotFoundException {
		userService.save(user);
		return ResponseEntity.ok(user);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserLoginRequestDTO body, HttpServletResponse response) throws ResourceNotFoundException {
		String email = body.email;
		String password = body.password;

		Pair<String, LoggedUserResponseDTO> authResponse = userService.authenticateUser(email, password);

		response.addHeader("Access-Control-Expose-Headers", "Authorization");
		response.addHeader("Authorization", "Bearer " + authResponse.getFirst());

		return new ResponseEntity<>(authResponse.getSecond(), HttpStatus.OK);
	}
}