package br.com.codenation.errorcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.repository.UserRepository;

@Service
public class UserService{

	@Autowired
	UserRepository userRepository;

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public void save(List<User> user) {
		userRepository.saveAll(user);
	}
}