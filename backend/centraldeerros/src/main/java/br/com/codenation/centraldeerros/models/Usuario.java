package br.com.codenation.centraldeerros.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="tblUsuario")
public class Usuario implements Serializable{

	private static final long serialVersionUID = 1l;
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String senha;
	
	@Column(name = "tokenacesso", nullable = false)
	private String tokenAcesso;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
	private List<Log> log;

	public Usuario() {}
	
	public Usuario(String nome, String email, String senha, String tokenAcesso) {
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.tokenAcesso = tokenAcesso;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getTokenAcesso() {
		return tokenAcesso;
	}

	public void setTokenAcesso(String tokenAcesso) {
		this.tokenAcesso = tokenAcesso;
	}
}
