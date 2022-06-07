package com.backend.server.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.backend.server.dto.AnonymousLoginDto;
import com.backend.server.dto.NewUserDto;
import com.backend.server.repositories.GeneralUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import com.backend.server.models.user.GeneralUser;

@AllArgsConstructor
@Service
public class GeneralUserService {

  @Autowired private final GeneralUserRepository generalUserRepository;

  @Autowired private BCryptPasswordEncoder passwordEncoder;

  public boolean checkDuplicateUsername(String username) {
    Optional<GeneralUser> user = generalUserRepository.checkDuplicateUsername(username);
    return user.isPresent();
  }

  public boolean checkDuplicateEmail(String email) {
    Optional<GeneralUser> user = generalUserRepository.checkDuplicateEmail(email);
    return user.isPresent();
  }

  public boolean checkUsernameExist(String username) {
    Optional<GeneralUser> user = generalUserRepository.findUserByUsername(username);
    System.out.println("check user in repository" + user.isPresent());
    return user.isPresent();
  }

  public boolean checkEmailExist(String email) {
    Optional<GeneralUser> user = generalUserRepository.findUserByEmail(email);
    return user.isPresent();
  }

  public void create(NewUserDto newUserDto) {
    generalUserRepository.insert(
        new GeneralUser(
            newUserDto.getUsername(),
            newUserDto.getNickname(),
            passwordEncoder.encode(newUserDto.getPassword()),
            newUserDto.getEmail(),
            new Date(),
            new Date()));
  }

  public GeneralUser create(AnonymousLoginDto anonymousLoginDto) {
    return generalUserRepository.insert(
        new GeneralUser(anonymousLoginDto.getNickname(), new Date(), new Date()));
  }

  public Optional<GeneralUser> findUserByUsername(String username) {
    return generalUserRepository.findUserByUsername(username);
  }

  public Optional<GeneralUser> findUserByEmail(String email) {
    return generalUserRepository.findUserByEmail(email);
  }

  public Optional<GeneralUser> findUserByUsernameOrEmail(String usernameOrEmail) {
    Optional<GeneralUser> generalUser = generalUserRepository.findUserByUsername(usernameOrEmail);
    if (generalUser.isPresent()) {
      return generalUser;
    }
    generalUser = generalUserRepository.findUserByEmail(usernameOrEmail);
    return generalUser;
  }

  public boolean validatePassword(String rawPassword, String encodedPassword) {
    return passwordEncoder.matches(rawPassword, encodedPassword);
  }

  public Optional<GeneralUser> findUserById(String id) {
    return generalUserRepository.findById(id);
  }

  public boolean checkUserExistById(String id) {
    return generalUserRepository.findById(id).isPresent();
  }

  public List<Object> findUsersByContainingNickname(String str) {
    return generalUserRepository.filterUsersByContainingNickname(str);
  }
}
