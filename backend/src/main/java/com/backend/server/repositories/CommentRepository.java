package com.backend.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.backend.server.models.Comment;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {

    @Query("{description: {$regex: ?0}}")
    public List<Comment> findCommentsByDescriptionRegEx(String description);

    @Query("{'authorId': ?0}")
    public List<Comment> findAllByUserId(String id);
}
