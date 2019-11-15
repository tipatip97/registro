package ru.registro.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class EntryRequest {
    @JsonProperty("user")
    private UserDTO userDTO;

    private List<FieldDTO> fields;

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public List<FieldDTO> getFields() {
        return fields;
    }

    public void setFields(List<FieldDTO> fields) {
        this.fields = fields;
    }
}
