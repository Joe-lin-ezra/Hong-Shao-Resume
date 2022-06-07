package com.backend.server.models.user;

import com.backend.server.dto.AnonymousLoginDto;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("AnonymousUsers")
@Data
public class AnonymousUser {
    @Id
    private String id;
    private String nickname;
    @CreatedDate
    private Date createDate;
    @LastModifiedDate
    private Date updateDate;

    public AnonymousUser(String nickname, Date createDate, Date updateDate) {
        this.nickname = nickname;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
