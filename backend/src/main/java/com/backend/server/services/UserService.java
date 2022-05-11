package com.backend.server.services;

import java.util.Date;
import java.util.Optional;

import com.backend.server.dto.NewUserDto;
import com.backend.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import com.backend.server.models.User;


@AllArgsConstructor
@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean checkDuplicateUsername(String username) {
        Optional<User> user = userRepository.checkDuplicateUsername(username);
        return user.isPresent();
    }

    public boolean checkDuplicateEmail(String email) {
        Optional<User> user = userRepository.checkDuplicateEmail(email);
        return user.isPresent();
    }

    public boolean checkUsernameExist(String username) {
        Optional<User> user = userRepository.findUserByUsername(username);
        return user.isPresent();
    }

    public boolean checkEmailExist(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }

    public void createNewUser(NewUserDto newUserDto) {
        User user = new User(
                newUserDto.getUsername(),
                passwordEncoder.encode(newUserDto.getPassword()),
                newUserDto.getEmail(),
                new Date(),
                new Date()
        );
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
