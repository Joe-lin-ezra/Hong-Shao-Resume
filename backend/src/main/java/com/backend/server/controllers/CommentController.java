package com.backend.server.controllers;

import com.backend.server.dto.CommentDto;
import com.backend.server.dto.NewCommentDto;
import com.backend.server.models.Comment;
import com.backend.server.models.user.AnonymousUser;
import com.backend.server.models.user.GeneralUser;
import com.backend.server.securities.JwtUtil;
import com.backend.server.services.AnonymousUserService;
import com.backend.server.services.CommentService;
import com.backend.server.services.GeneralUserService;
import com.backend.server.util.ResponseMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 60 * 60)
@RestController
@RequestMapping("/api")
public class CommentController {

  private static final Logger logger = LoggerFactory.getLogger(CommentController.class);
  @Autowired private GeneralUserService generalUserService;
  @Autowired private AnonymousUserService anonymousUserService;
  @Autowired private CommentService commentService;
  @Autowired private JwtUtil jwtUtil;

  @GetMapping(value = "/comments", produces = "application/json")
  public Object getAllComment() {
    try {
      List<Comment> allComments = commentService.findAll();
      System.out.println(allComments);
      List<CommentDto> commentDtos = commentService.addNickname(allComments);

      return new ResponseEntity<>(
          new ResponseMessage("All comments order by created date.", commentDtos),
          null,
          HttpStatus.OK);
    } catch (Exception exception) {
      logger.error("Fail when login: ", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(value = "/comment", consumes = "application/json", produces = "application/json")
  public Object postComment(
      @RequestHeader HttpHeaders header, @Valid @RequestBody NewCommentDto newCommentDto) {
    try {
      String bearerToken = header.getFirst("Authorization");

      if (!jwtUtil.validateJwtToken(bearerToken.split(" ")[1])) {
        return new ResponseEntity<>(
            new ResponseMessage("Unauthorized"), null, HttpStatus.UNAUTHORIZED);
      }

      String userId = jwtUtil.getIdFromJwtToken(bearerToken.split(" ")[1]);
      if (!generalUserService.checkUserExistById(userId)
          && !anonymousUserService.checkUserExistById(userId)) {
        return new ResponseEntity<>(
            new ResponseMessage("User not found."), null, HttpStatus.NOT_FOUND);
      }

      commentService.create(newCommentDto, userId);
      return new ResponseEntity<>(new ResponseMessage("Success."), null, HttpStatus.CREATED);
    } catch (Exception exception) {
      logger.error("Fail when post comment!! ", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PatchMapping(value = "/comment/{id}", consumes = "application/json", produces = "application/json")
  public Object patchComment(
      @RequestHeader HttpHeaders header, @PathVariable("id") String commentId, @Valid @RequestBody CommentDto commentDto) {
    try {
      String bearerToken = header.getFirst("Authorization");
      if (!jwtUtil.validateJwtToken(bearerToken.split(" ")[1])) {
        return new ResponseEntity<>(
            new ResponseMessage("Unauthorized"), null, HttpStatus.UNAUTHORIZED);
      }

      String tokenUserId = jwtUtil.getIdFromJwtToken(bearerToken.split(" ")[1]);
      Optional<GeneralUser> optionalGeneralUser = generalUserService.findUserById(tokenUserId);
      Optional<AnonymousUser> optionalAnonymousUser = anonymousUserService.findUserById(tokenUserId);
      if (optionalGeneralUser.isEmpty() && optionalAnonymousUser.isEmpty()) {
        return new ResponseEntity<>(
            new ResponseMessage("User not found."), null, HttpStatus.NOT_FOUND);
      }

      Optional<Comment> optionalComment = commentService.findById(commentId);
      if (optionalComment.isEmpty()) {
          return new ResponseEntity<>(new ResponseMessage("Comment not found."), null, HttpStatus.NO_CONTENT);
      }

      if (!tokenUserId.equals(optionalComment.get().getAuthorId())) {
          return new ResponseEntity<>(new ResponseMessage("You don't own this comment."), null, HttpStatus.UNAUTHORIZED);
      }

      commentService.update(optionalComment.get(), commentDto);

      return new ResponseEntity<>(new ResponseMessage("Updated"), null, HttpStatus.OK);
    } catch (Exception exception) {
      logger.error("Fail when login: ", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping(value = "/comment/{id}", produces = "application/json")
  public Object deleteComment(
      @RequestHeader HttpHeaders header, @PathVariable("id") String commentId) {
    try {
      String bearerToken = header.getFirst("Authorization");

      if (!jwtUtil.validateJwtToken(bearerToken.split(" ")[1])) {
        return new ResponseEntity<>(
            new ResponseMessage("Unauthorized"), null, HttpStatus.UNAUTHORIZED);
      }

      String tokenUserId = jwtUtil.getIdFromJwtToken(bearerToken.split(" ")[1]);
      Optional<GeneralUser> optionalGeneralUser = generalUserService.findUserById(tokenUserId);
      Optional<AnonymousUser> optionalAnonymousUser = anonymousUserService.findUserById(tokenUserId);
      if (optionalGeneralUser.isEmpty() && optionalAnonymousUser.isEmpty()) {
        return new ResponseEntity<>(
                new ResponseMessage("User not found."), null, HttpStatus.NOT_FOUND);
      }

      Optional<Comment> optionalComment = commentService.findById(commentId);
      if (optionalComment.isEmpty()) {
        return new ResponseEntity<>(new ResponseMessage("Comment not found."), null, HttpStatus.NO_CONTENT);
      }

      if (!tokenUserId.equals(optionalComment.get().getAuthorId())) {
        return new ResponseEntity<>(new ResponseMessage("You don't own this comment."), null, HttpStatus.UNAUTHORIZED);
      }

      commentService.deleteById(commentId);

      return new ResponseEntity<>(new ResponseMessage("deleted"), null, HttpStatus.OK);
    } catch (Exception exception) {
      logger.error("Fail when login: ", exception);
      return new ResponseEntity<>(
          new ResponseMessage("Internal Server Error"), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
