package br.com.codenation.errorcenter.utils;

public enum EnumValidationException {

	ERROR_USER_SAVE("Erro ao salvar o usuário"),
	ERROR_USER_FIND_EMAIL("Email nao encontrado"),
	ERROR_USER_VALIDATE_SENHA("Senha incorreta"),
	ERROR_LOG_SAVE("Erro ao salvar o log");
	
	private String descricao;

	private EnumValidationException(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
