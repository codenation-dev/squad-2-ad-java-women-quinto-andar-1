package br.com.codenation.errorcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.codenation.errorcenter.interfaces.InterfaceService;
import br.com.codenation.errorcenter.models.User;
import br.com.codenation.errorcenter.repository.UserRepository;

@Component
public class UserService implements InterfaceService{

	@Autowired
	UserRepository userRepository;

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> findById(long id) {
		return userRepository.findById(id);
	}

	@Override
	public Optional<User> findByName(String name) {
		return userRepository.findByName(name);
	}

	public void saveAll(List<User> user) {
		userRepository.saveAll(user);
	}

	public void save(User user) {
		userRepository.save(user);	
	}
}