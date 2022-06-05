package com.backend.server.services;

import com.backend.server.dto.CommentDto;
import com.backend.server.dto.NewCommentDto;
import com.backend.server.models.Comment;
import com.backend.server.models.user.AnonymousUser;
import com.backend.server.models.user.GeneralUser;
import com.backend.server.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

  @Autowired private CommentRepository commentRepository;
  @Autowired private GeneralUserService generalUserService;
  @Autowired private AnonymousUserService anonymousUserService;

  public List<Comment> findAll() {
    return commentRepository.findAll();
  }

  public void create(NewCommentDto newCommentDto, String userId) {
    commentRepository.insert(
        new Comment(userId, newCommentDto.getDescription(), new Date(), new Date()));
  }

  public boolean checkExistById(String id) {
      return commentRepository.existsById(id);
  }

  public Optional<Comment> findById(String id) {
      return commentRepository.findById(id);
  }
  public void deleteById(String id) {
    commentRepository.deleteById(id);
  }

  public void update(Comment comment, CommentDto commentDto) {
      comment.setDescription(commentDto.getDescription());
      comment.setUpdateDate(new Date());
      commentRepository.save(comment);
  }

  public List<CommentDto> addNickname(List<Comment> allComments) {
    List<CommentDto> commentDtos = new ArrayList<>();
    allComments.forEach(
        (comment) -> {
          Optional<GeneralUser> optionalGeneralUserUser =
              generalUserService.findUserById(comment.getAuthorId());
          optionalGeneralUserUser.ifPresent(
              user -> commentDtos.add(new CommentDto(comment, user.getNickname())));
          Optional<AnonymousUser> optionalAnonymousUser =
              anonymousUserService.findUserById(comment.getAuthorId());
          optionalAnonymousUser.ifPresent(
              user -> commentDtos.add(new CommentDto(comment, user.getNickname())));
        });
    return commentDtos;
  }

  public void delete(Comment comment) {
      commentRepository.deleteById(comment.getId());
  }

}
