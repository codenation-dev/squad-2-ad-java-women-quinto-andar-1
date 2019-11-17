package br.com.codenation.errorcenter.dtos.responses.projections;

import br.com.codenation.errorcenter.models.Level;
import br.com.codenation.errorcenter.models.Status;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public interface LogResponseDTO {
    Long getId();
    String getTitle();
    Level getLevel();
    String getOrigin();
    Status getStatus();

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss", timezone = "GMT-03:00")
    Date getEvent_date();
}
