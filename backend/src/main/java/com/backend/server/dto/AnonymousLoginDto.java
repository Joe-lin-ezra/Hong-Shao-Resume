package com.backend.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class AnonymousLoginDto {
    @NotBlank
    @NotNull
    private String nickname;

    public AnonymousLoginDto(String nickname) {
        this.nickname = nickname;
    }
}
