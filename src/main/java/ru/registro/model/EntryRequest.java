package ru.registro.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class EntryRequest {
    @JsonProperty("user")
    @ApiModelProperty("Всякая конфиденциальная информация")
    private UserDTO userDTO;

    @ApiModelProperty(value = "Дополнительные поля")
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
