package ru.registro.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel("Field")
public class FieldDTO {
    @ApiModelProperty(value = "Название поля")
    private String name;

    @ApiModelProperty(value = "Содрежимое поля")
    private String value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
