package br.com.codenation.errorcenter.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.codenation.errorcenter.dtos.responses.LoggedUserResponseDTO;
import br.com.codenation.errorcenter.exception.ResourceNotFoundException;
import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.repository.UserRepository;
import br.com.codenation.errorcenter.security.JwtToken;

@Service
@Transactional
public class UserService{

	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();


	public Optional<User> findByEmail(String email) {

			return userRepository.findByEmail(email);	
	
	}

	public void save(User user) {
		
		/*Verifica se o email já existe*/
		Optional<User> userCheck = findByEmail(user.getEmail());
		
		if (userCheck.isPresent()) {
			/*User já cadastrado com esse email*/
			/*TODO Retornar Exception ERROR_USER_EMAIL_EXISTS("Email já cadastrado.")*/
			throw new ResourceNotFoundException("ERROR_USER_EMAIL_EXISTS");
		} else if (user.getName() == null){
			throw new ResourceNotFoundException("ERROR_USER_EMAIL_EXISTS");
		} else if (user.getEmail() == null){
			throw new ResourceNotFoundException("ERROR_USER_EMAIL_EXISTS");
		} else if (user.getPassword() == null){
			throw new ResourceNotFoundException("ERROR_USER_EMAIL_EXISTS");
		}
		else {
			/*Manipula a senha para encriptar*/
			String passwordEncoded = bcrypt.encode(user.getPassword());
			user.setPassword(passwordEncoded);

			// cria um token padrão UUID random pro usuário, que vamos exibir no front
			user.setTokenAccess(UUID.randomUUID().toString());
			
			userRepository.save(user);		
		}
	}

	public Pair<String, LoggedUserResponseDTO> authenticateUser(String email, String rawPassword) throws Exception {
		Optional<User> user = userRepository.findByEmail(email);

		if (user.isPresent()) {
			if (bcrypt.matches(rawPassword, user.get().getPassword())) {
				String userToken = user.get().getTokenAccess();
				String jwtToken = JwtToken.addJwtToken(userToken);

				Long id = user.get().getId();
				String name = user.get().getName();
				String userEmail = user.get().getEmail();
				String tokenAccess = user.get().getTokenAccess();

				LoggedUserResponseDTO formattedUser = new LoggedUserResponseDTO(id, name, userEmail, tokenAccess);

				return Pair.of(jwtToken, formattedUser);
			}

			// TODO formatar os erros pra retornar o status também
			throw new Exception("Senha incorreta");
		}

		// TODO formatar os erros pra retornar o status também
		throw new Exception("Usuário não encontrado");
	}
}