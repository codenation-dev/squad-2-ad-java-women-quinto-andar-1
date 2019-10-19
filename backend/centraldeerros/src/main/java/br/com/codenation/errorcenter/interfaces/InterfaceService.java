package br.com.codenation.errorcenter.interfaces;

import java.util.List;
import java.util.Optional;

public interface InterfaceService {

	public List<?> findAll();
	
	public Optional<?> findById(long id);
	
	public Optional<?> findByName(String name);

	//public void save(Object object);
}