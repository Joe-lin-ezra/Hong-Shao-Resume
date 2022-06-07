package com.backend.server.services;

import com.backend.server.models.user.AnonymousUser;
import com.backend.server.repositories.AnonymousUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AnonymousUserService {
    @Autowired
    private AnonymousUserRepository anonymousUserRepository;

    public AnonymousUser create(String nickname) {
        return anonymousUserRepository.insert(new AnonymousUser(nickname, new Date(), new Date()));
    }

    public boolean checkUserExistById(String id) {
        return anonymousUserRepository.findById(id).isPresent();
    }

    public Optional<AnonymousUser> findUserById(String id) {
        return anonymousUserRepository.findById(id);
    }

    public List<Object> findUsersByContainingNickname(String regEx) {
        return anonymousUserRepository.filterAnonymousUsersByNickname(regEx);
    }
}
