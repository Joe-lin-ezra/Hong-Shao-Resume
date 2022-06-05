package com.backend.server.securities;

import com.backend.server.models.user.AnonymousUser;
import com.backend.server.models.user.GeneralUser;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import javax.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

  private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

  @Value("${backend.server.jwtSecret}")
  private String jwtSecrete;

  @Value("${backend.server.jwtExpiredTimeMs}")
  private String jwtExpiredTimeMs;

  public String generateJwtToken(@NotNull GeneralUser generalUser) {
    Map<String, String> claim = new HashMap<>();
    claim.put("id", generalUser.getId());

    return Jwts.builder()
        .setClaims(claim)
        .setIssuedAt(new Date())
        .setExpiration(
            new Date(Instant.now().toEpochMilli() + Integer.parseInt(this.jwtExpiredTimeMs)))
        .signWith(Keys.hmacShaKeyFor(this.jwtSecrete.getBytes()))
        .compact();
  }

  public String generateJwtToken(@NotNull AnonymousUser anonymousUser) {
    Map<String, String> claim = new HashMap<>();
    claim.put("id", anonymousUser.getId());

    return Jwts.builder()
        .setClaims(claim)
        .setIssuedAt(new Date())
        .signWith(Keys.hmacShaKeyFor(this.jwtSecrete.getBytes()))
        .compact();
  }

  public String getIdFromJwtToken(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(this.jwtSecrete.getBytes()))
        .build()
        .parseClaimsJws(token)
        .getBody()
        .get("id")
        .toString();
  }

  public boolean validateJwtToken(String authToken) {

    try {
      Jwts.parserBuilder()
          .setSigningKey(Keys.hmacShaKeyFor(this.jwtSecrete.getBytes()))
          .build()
          .parseClaimsJws(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Malformed JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    } catch (IncorrectClaimException e) {
      System.out.printf("claim field value is not right: %s\n", e.getMessage());
    }

    return false;
  }
}
