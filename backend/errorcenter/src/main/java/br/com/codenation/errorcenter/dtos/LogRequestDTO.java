package br.com.codenation.errorcenter.dtos;

public class LogRequestDTO {
    
    public long id;
    public String status;


    public LogRequestDTO(long id, String status) {
        this.id = id;
        this.status = status;
    }


    public long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



    
}