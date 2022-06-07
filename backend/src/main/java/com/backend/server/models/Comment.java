package com.backend.server.models;

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

@Document(collection = "Comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    private String id;
    private String authorId;
    private String description;
    @CreatedDate
    private Date createDate;
    @LastModifiedDate
    private Date updateDate;

    public Comment (String authorId, String description, Date createDate, Date updateDate) {
        this.authorId = authorId;
        this.description = description;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }
}
