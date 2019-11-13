package br.com.codenation.errorcenter.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalControllerAdvice {

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleException(Exception ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, ex.getCause().getMessage(), ex.getMessage());
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleResourceNotFoundException(ResourceNotFoundException ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, "Retorno nulo", "Não foi possivel listar dados pois não existe registro no banco");
	}
	
	@ExceptionHandler(ExpiredJwtException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public MessageException handleExpiredJwtException(ExpiredJwtException ex) {
		return new MessageException(HttpStatus.FORBIDDEN, "Token Expirado", "Não foi possivel realizar a chamada pois os token está expirado");
	}
	
	@ExceptionHandler(UnsupportedJwtException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public MessageException handleUnsupportedJwtException(UnsupportedJwtException ex) {
		return new MessageException(HttpStatus.FORBIDDEN, "Erro Token", "JWT nao suportado");
	}
	@ExceptionHandler(MalformedJwtException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public MessageException handleMalformedJwtException(MalformedJwtException ex) {
		return new MessageException(HttpStatus.FORBIDDEN, "Erro Token", "JWT inválido");
	}
	@ExceptionHandler(SignatureException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public MessageException handleSignatureException(SignatureException ex) {
		return new MessageException(HttpStatus.FORBIDDEN, "Erro Token", "Não foi possivel validar a assinatura JWT");
	}
	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public MessageException handleIllegalArgumentException(IllegalArgumentException ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, "Erro Token", "String incorreta");
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleMethodArgumentValidException(MethodArgumentNotValidException ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, ex.getBindingResult().getFieldError().getCode(),
				ex.getBindingResult().getFieldError().getField());
	}
}
