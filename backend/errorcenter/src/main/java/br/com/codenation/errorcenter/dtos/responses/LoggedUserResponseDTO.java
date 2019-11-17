package br.com.codenation.errorcenter.dtos.responses;

public class LoggedUserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String tokenAccess;

    public LoggedUserResponseDTO(Long id, String name, String email, String tokenAccess) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.tokenAccess = tokenAccess;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTokenAccess() {
        return tokenAccess;
    }

    public void setTokenAccess(String tokenAccess) {
        this.tokenAccess = tokenAccess;
    }
}
