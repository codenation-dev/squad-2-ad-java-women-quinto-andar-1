package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Environment;

public interface LogWithDetailsResponseDTO extends LogResponseDTO {
    Long getUser_id();
    String getDescription();
    Environment getEnvironment();
}
