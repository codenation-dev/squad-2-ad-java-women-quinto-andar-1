package br.com.codenation.errorcenter.security;

import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtToken {
    // TODO: esconder essa variável dentro das config vars do Heroku para não deixar exposta no código
    private static final String JWT_LOCAL_SECRET = "4z6B8EbGdKgNjQnTqVsYv2x5A7C9FcHeKhPkRnUr";
    private static final String TOKEN_ISSUER = "sherlog-api";
    private static final String TOKEN_AUDIENCE = "sherlog-app";
    private static final int ONE_HOUR = 60 * 60;
    private static final int MILLISECONDS = 10000;
    private static final int TOKEN_EXPIRATION_TIME = MILLISECONDS * ONE_HOUR;

    private static final String TOKEN_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer";

    public static String addJwtToken(String userToken) {
        String tokenId = UUID.randomUUID().toString();

        String jwtToken = Jwts.builder()
                .setId(tokenId)
                .setIssuer(TOKEN_ISSUER)
                .setAudience(TOKEN_AUDIENCE)
                .setSubject(userToken)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(JWT_LOCAL_SECRET.getBytes()))
                .compact();

        return jwtToken;
    }

    public static Authentication validateAuthorizedRequest(HttpServletRequest request) {
        String authToken = request.getHeader(TOKEN_HEADER);

        if (authToken != null) {
            return validateJwtToken(authToken);
        }

        return null;
    }

    private static Authentication validateJwtToken(String userAuthToken) {
        String userToken = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(JWT_LOCAL_SECRET.getBytes()))
                .parseClaimsJws(userAuthToken.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

        return userToken != null
                ? new UsernamePasswordAuthenticationToken(userToken, null, null)
                : null;
    }
}
