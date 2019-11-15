package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Level;
import br.com.codenation.errorcenter.models.Status;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface LogWithFrequencyResponseDTO {
    String getTitle();
    Level getLevel();
    String getOrigin();
    int getFrequency();
}
