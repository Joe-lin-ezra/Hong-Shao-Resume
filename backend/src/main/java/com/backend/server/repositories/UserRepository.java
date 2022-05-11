package com.backend.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.backend.server.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Query("{'username': ?0}")
    Optional<User> checkDuplicateUsername(String username);
    @Query("{'email': ?0}")
    Optional<User> checkDuplicateEmail(String email);

    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
    
}
