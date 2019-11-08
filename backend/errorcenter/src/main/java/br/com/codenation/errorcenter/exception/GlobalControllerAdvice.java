package br.com.codenation.errorcenter.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalControllerAdvice {

	@ExceptionHandler(ResourceNotFoundException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleResourceNotFoundException(ResourceNotFoundException ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, "Retorno nulo", "Não foi possivel listar dados pois não existe registro no banco");
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleMethodArgumentValidException(MethodArgumentNotValidException ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, ex.getBindingResult().getFieldError().getCode(),
				ex.getBindingResult().getFieldError().getField());
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public MessageException handleException(Exception ex) {
		return new MessageException(HttpStatus.BAD_REQUEST, ex.getCause().getMessage(), ex.getMessage());
	}
	
}
