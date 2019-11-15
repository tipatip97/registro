package ru.registro.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EntryResponse {
    @JsonProperty("id")
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
