package com.backend.server.models.user;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Document(collection = "GeneralUsers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeneralUser {
    @Id
    private String id;
    @Indexed(unique = true)
    private String username;
    private String nickname;
    private String password;
    @Indexed(unique = true)
    private String email;
    @CreatedDate
    private Date createDate;
    @LastModifiedDate
    private Date updateDate;

    public GeneralUser(String username, String nickname, String password, String email, Date createDate, Date updateDate) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public GeneralUser(String nickname, Date createDate, Date updateDate) {
        this.nickname = nickname;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
