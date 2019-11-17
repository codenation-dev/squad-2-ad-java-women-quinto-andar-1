package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Level;

public interface LogByFrequencyResponseDTO {
    String getTitle();
    Level getLevel();
    String getDescription();
    String getOrigin();
    int getFrequency();
}
