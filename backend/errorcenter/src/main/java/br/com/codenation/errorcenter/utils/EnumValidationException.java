package br.com.codenation.errorcenter.utils;

public enum EnumValidationException {

	ERROR_USER_SAVE("Erro ao salvar o usuário"),
	ERROR_USER_FIND_EMAIL("Email não encontrado"),
	ERROR_USER_EMAIL_EXISTS("Email já cadastrado"),
	ERROR_USER_VALIDATE_SENHA("Senha incorreta"),
	ERROR_LOG_SAVE("Erro ao salvar o log"),
	ERROR_NOT_FOUND("Não foi possivel listar dados pois não existe registro no banco");

	private String descricao;

	private EnumValidationException(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
