package com.backend.server.dto;

import com.backend.server.models.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    String id;
    String authorId;
    String authorNickname;
    String description;
    Date createDate;
    Date updateDate;

    public CommentDto(Comment comment, String userNickname) {
        this.id = comment.getId();
        this.authorId = comment.getAuthorId();
        this.authorNickname = userNickname;
        this.description = comment.getDescription();
        this.createDate = comment.getCreateDate();
        this.updateDate = comment.getUpdateDate();
    }
}
