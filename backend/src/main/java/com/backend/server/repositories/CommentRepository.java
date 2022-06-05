package com.backend.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.server.models.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {}
