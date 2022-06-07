package com.backend.server.repositories;

import com.backend.server.models.user.AnonymousUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnonymousUserRepository extends MongoRepository<AnonymousUser, String> {
    @Query("{nickname: {$regex: ?0}}")
    List<Object> filterAnonymousUsersByNickname(String regEx);
}
