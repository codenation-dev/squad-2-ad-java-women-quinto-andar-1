package br.com.codenation.centraldeerros.models;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="tblLogs")
public class Log implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@Column(length = 500, nullable = false)
	@Size(max = 500)
	private String descricao;
	
	@Enumerated(EnumType.STRING)
	private Origem origem;
	
	@Enumerated(EnumType.STRING)
	private Nivel nivel;
	
	@Column(nullable = false)
	private LocalDate dataEvento;
	
}