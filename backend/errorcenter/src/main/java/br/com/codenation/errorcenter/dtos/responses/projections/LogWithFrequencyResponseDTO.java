package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Level;

public interface LogWithFrequencyResponseDTO {
    String getTitle();
    Level getLevel();
    String getOrigin();
    int getFrequency();
}
