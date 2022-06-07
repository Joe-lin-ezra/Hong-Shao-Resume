package com.backend.server.controllers;

import com.backend.server.dto.AnonymousLoginDto;
import com.backend.server.dto.LoginDto;
import com.backend.server.models.user.AnonymousUser;
import com.backend.server.models.user.GeneralUser;
import com.backend.server.services.AnonymousUserService;
import com.backend.server.services.GeneralUserService;
import com.backend.server.util.ResponseMessage;
import com.backend.server.dto.NewUserDto;
import com.backend.server.securities.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static java.util.Map.entry;

@CrossOrigin(origins = "*", maxAge = 60 * 60)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
  @Autowired private GeneralUserService generalUserService;
  @Autowired private AnonymousUserService anonymousUserService;
  @Autowired() private JwtUtil jwtUtil;

  @GetMapping("/test")
  public ResponseEntity<?> test() {
    logger.error("hi i'm error log");
    return new ResponseEntity<>(new ResponseMessage("test"), null, HttpStatus.OK);
  }

  @PostMapping(path = "/signup", consumes = "application/json", produces = "application/json")
  public Object signup(@Valid @RequestBody NewUserDto newUserDto, Errors errors) {
    try {
      if (errors.hasErrors()) {
        return new ResponseEntity<>(
            new ResponseMessage("Incompletely parameters."), HttpStatus.BAD_REQUEST);
      }
      if (generalUserService.checkDuplicateUsername(newUserDto.getUsername())) {
        return new ResponseEntity<>(
            new ResponseMessage("Username is already taken."), HttpStatus.BAD_REQUEST);
      }
      if (generalUserService.checkDuplicateEmail(newUserDto.getEmail())) {
        return new ResponseEntity<>(
            new ResponseMessage("Email is already taken."), HttpStatus.BAD_REQUEST);
      }

      generalUserService.create(newUserDto);

      return new ResponseEntity<>(new ResponseMessage("Success!"), null, HttpStatus.CREATED);
    } catch (Exception exception) {
      logger.error("Cannot set user authentication: {}", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(path = "/anonymous", consumes = "application/json", produces = "application/json")
  public ResponseEntity<?> anonymous(@Valid @RequestBody AnonymousLoginDto anonymousLoginDto) {
    try {
      AnonymousUser anonymousUser = anonymousUserService.create(anonymousLoginDto.getNickname());
      Map<String, String> data = new HashMap<>();
      data.put("token", jwtUtil.generateJwtToken(anonymousUser));
      return new ResponseEntity<>(new ResponseMessage("success.", data), null, HttpStatus.OK);
    } catch (Exception exception) {
      logger.error("Fail when login {}", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
  public Object login(@Valid @RequestBody LoginDto loginDto, Errors errors) {
    try {
      if (errors.hasErrors()) {
        return new ResponseEntity<>(
            new ResponseMessage("Incompletely parameters."), null, HttpStatus.BAD_REQUEST);
      }

      Optional<GeneralUser> generalUser =
          generalUserService.findUserByUsernameOrEmail(loginDto.getUsernameOrEmail());
      if (generalUser.isEmpty()
          || !generalUserService.validatePassword(
              loginDto.getPassword(), generalUser.get().getPassword())) {
        return new ResponseEntity<>(
            new ResponseMessage("Username, email or password is wrong. Please try again."),
            null,
            HttpStatus.UNAUTHORIZED);
      }

      String token = jwtUtil.generateJwtToken(generalUser.get());

      return new ResponseEntity<>(
          new ResponseMessage("success", Map.ofEntries(entry("token", token))),
          null,
          HttpStatus.OK);
    } catch (Exception exception) {
      logger.error("Fail when login {}", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
