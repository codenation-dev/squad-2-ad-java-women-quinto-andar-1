package br.com.codenation.errorcenter.exception;

import org.springframework.http.HttpStatus;

public class MessageException {

	private HttpStatus status;
	private String error;
	private String message;

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public MessageException(HttpStatus status, String error, String message) {
		super();
		this.status = status;
		this.error = error;
		this.message = message;
	}
}