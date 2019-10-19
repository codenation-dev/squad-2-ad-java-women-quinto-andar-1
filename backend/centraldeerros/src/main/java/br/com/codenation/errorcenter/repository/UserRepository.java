package br.com.codenation.errorcenter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codenation.errorcenter.models.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	public Optional<User> findByName(String name);
}