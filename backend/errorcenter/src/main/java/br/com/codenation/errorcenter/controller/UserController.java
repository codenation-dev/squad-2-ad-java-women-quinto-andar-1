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

import br.com.codenation.errorcenter.dtos.LoggedUserDto;
import br.com.codenation.errorcenter.dtos.UserLoginRequestDto;
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
	public ResponseEntity<?> login(@RequestBody UserLoginRequestDto body, HttpServletResponse response) {
		try {
			String email = body.email;
			String password = body.password;

			Pair<String, User> authResponse = userService.authenticateUser(email, password);
			User user = authResponse.getSecond();
			LoggedUserDto formattedUser = new LoggedUserDto(user.getId(), user.getName(), user.getEmail(), user.getTokenAccess());

			response.addHeader("Access-Control-Expose-Headers", "Authorization");
			response.addHeader("Authorization", "Bearer " + authResponse.getFirst());

			return new ResponseEntity<>(formattedUser, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: fazer o tratamento correto dos erros
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}