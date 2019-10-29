package br.com.codenation.errorcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.repository.UserRepository;

@Service
public class UserService{

	@Autowired
	private UserRepository userRepository;
	
	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();


	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void save(List<User> user) {
		
		/*Verifica se o email já existe*/
		Optional<User> userCheck = findByEmail(((User) user).getEmail());
		
		if (userCheck.isPresent()) {
			/*User já cadastrado com esse email*/
			/*TODO Retornar Exception ERROR_USER_EMAIL_EXISTS("Email já cadastrado.")*/
		} else {
			/*Manipula a senha para encriptar*/
			String passwordEncoded = bcrypt.encode(((User) user).getPassword());
			((User) user).setPassword(passwordEncoded);
			
			userRepository.saveAll(user);
			
		}
	}
	
	
	public Optional<User> login(String rawPassword, String email) {
		
		try {
			
			/*Buscar User por email*/
			Optional<User> user = findByEmail(email);

			if (!user.isPresent()) {
				/*Nenhum user encontrado com esse email*/
				/*TODO Retornar Exception ERROR_USER_FIND_EMAIL("Email nao encontrado"),*/
			} else {
				
			    if (bcrypt.matches(rawPassword, user.get().getPassword())) {
			    	return user; /*User validado!*/
				}	
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null; /*Nao validado!*/	
	}
}