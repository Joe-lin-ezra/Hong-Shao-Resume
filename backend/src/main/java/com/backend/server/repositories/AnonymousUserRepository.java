package com.backend.server.repositories;

import com.backend.server.models.user.AnonymousUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnonymousUserRepository extends MongoRepository<AnonymousUser, String> {
}
