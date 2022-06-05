package com.backend.server.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponseMessage {
    private String message;
    private Object data;

    public ResponseMessage(String message) {
        this.message = message;
    }
}
