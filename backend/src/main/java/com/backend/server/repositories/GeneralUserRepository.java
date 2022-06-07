package com.backend.server.repositories;

import com.backend.server.models.user.GeneralUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GeneralUserRepository extends MongoRepository<GeneralUser, String> {

    @Query("{'username': ?0}")
    Optional<GeneralUser> checkDuplicateUsername(String username);
    @Query("{'email': ?0}")
    Optional<GeneralUser> checkDuplicateEmail(String email);

    Optional<GeneralUser> findUserByUsername(String username);

    Optional<GeneralUser> findUserByEmail(String email);


    @Query("{nickname: {$regex: ?0}}")
    List<Object> filterUsersByContainingNickname(String nickname);
}
