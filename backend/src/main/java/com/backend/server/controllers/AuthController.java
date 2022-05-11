package com.backend.server.controllers;

import com.backend.server.dto.LoginDto;
import com.backend.server.models.User;
import com.backend.server.util.ResponseMessage;
import com.backend.server.services.UserService;
import com.backend.server.dto.NewUserDto;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 60 * 60)
@RestController
@RequestMapping("/api/auth")
@Log4j2
public class AuthController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        logger.error("hi i'm error log");
        return new ResponseEntity<>(
                new ResponseMessage("test"),
                null,
                HttpStatus.OK
        );
    }

    @PostMapping(path = "/signup", consumes = "application/json", produces = "application/json")
    public Object signup(@Valid @RequestBody NewUserDto newUserDto, Errors errors) {
        try {
            if (errors.hasErrors()) {
                return new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Incompletely parameters."
                );
            }
            if (userService.checkDuplicateUsername(newUserDto.getUsername())) {
                return new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Username is already taken."
                );
            }
            if (userService.checkDuplicateEmail(newUserDto.getEmail())) {
                return new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Email is already taken."
                );
            }

            userService.createNewUser(newUserDto);

            return new ResponseEntity<>(
                    new ResponseMessage("Success!"),
                    null,
                    HttpStatus.CREATED);
        } catch (Exception exception) {
            logger.error("Cannot set user authentication: {}", exception);
            return new ResponseEntity<>(
                    new ResponseMessage("Internal Server Error"),
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/anonymous", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> anonymous() {
        try {
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    new ResponseMessage("Internal Server Error"),
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public Object login(@Valid @RequestBody LoginDto loginDto, Errors errors) {
        try {
            if(errors.hasErrors()) {
                return new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Incompletely parameters."
                );
            }

            User user = null;
            if(userService.checkUsernameExist(loginDto.getUsername())) {
                user = userService.findUserByUsername(loginDto.getUsername()).get();
            }
            if(userService.checkEmailExist(loginDto.getEmail())) {
                user = userService.findUserByEmail(loginDto.getEmail()).get();
            }
            if (Objects.isNull(user) || !userService.validatePassword(loginDto.getPassword(), user.getPassword())) {
                return new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Username, email or password is wrong. Please try again."
                );
            }

            // sign a json web token to check user state


            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Internal Server Error"),
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
