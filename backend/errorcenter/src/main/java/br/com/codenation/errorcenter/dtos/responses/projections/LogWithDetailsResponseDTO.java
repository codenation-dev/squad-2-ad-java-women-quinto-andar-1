package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Environment;

public interface LogWithDetailsResponseDTO extends LogResponseDTO {
    String getToken_access();
    String getDescription();
    Environment getEnvironment();
}
