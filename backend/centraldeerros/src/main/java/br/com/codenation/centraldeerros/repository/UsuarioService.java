package br.com.codenation.centraldeerros.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.codenation.centraldeerros.models.Usuario;

public interface UsuarioService extends JpaRepository<Usuario, Long>{

}
