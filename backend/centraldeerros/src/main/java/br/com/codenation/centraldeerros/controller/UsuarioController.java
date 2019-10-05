package br.com.codenation.centraldeerros.controller;

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

import br.com.codenation.centraldeerros.models.Usuario;
import br.com.codenation.centraldeerros.repository.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	UsuarioService us;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getUsuario(@PathVariable("id") long id){
		Optional<Usuario> user = us.findById(id);
		
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
			
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public ResponseEntity<?> insertUser(@RequestBody Usuario user){
		us.save(user);
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/test")
	public void oi(){
		System.out.println(12);
	}
	
	@PutMapping
	public String a() {
		return "oi";
	}
}