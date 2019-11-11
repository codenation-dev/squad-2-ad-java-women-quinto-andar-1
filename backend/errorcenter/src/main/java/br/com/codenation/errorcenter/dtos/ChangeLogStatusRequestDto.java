package br.com.codenation.errorcenter.dtos;

import java.util.List;

public class ChangeLogStatusRequestDto {

    public List<Long> id;
    public String status;

    public ChangeLogStatusRequestDto(List<Long> id, String status) {
        this.id = id;
        this.status = status;
    }

    public List<Long> getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public void setId(List<Long> id) {
		this.id = id;
	}

}