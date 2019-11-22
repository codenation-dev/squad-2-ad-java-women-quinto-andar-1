package br.com.codenation.errorcenter.utils;

public enum EnumValidationException {

	ERROR_USER_SAVE_NAME("Erro ao salvar o usuário, campo nome não preenchido"),
	ERROR_USER_SAVE_EMAIL("Erro ao salvar o usuário, campo email não preenchido"),
	ERROR_USER_SAVE_PWD("Erro ao salvar o usuário, campo senha não preenchido"),
	ERROR_USER_FIND("Usuário não encontrado"),
	ERROR_USER_EMAIL_EXISTS("Email já cadastrado"),
	ERROR_USER_VALIDATE_PWD("Senha incorreta"),
	ERROR_LOG_SAVE("Erro ao salvar o log"),
	ERROR_LOG_FIND("Log não encontrado"),
	ERROR_LOG_CHANGE_STATUS_ID("Erro ao mudar o status dos logs, selecione pelo menos um log"),
	ERROR_NOT_FOUND("Não foi possivel listar dados pois não existe registro no banco");

	private String descricao;

	private EnumValidationException(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
}
