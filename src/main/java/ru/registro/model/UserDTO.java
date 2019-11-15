package ru.registro.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel("User")
public class UserDTO {
    @ApiModelProperty(value = "ID пользователя. Если заполнен - другие поля можно перезаписать")
    private Long id;

    @ApiModelProperty(value = "Имя")
    private String name;

    @ApiModelProperty(value = "Фамилия")
    private String lastName;

    @ApiModelProperty(value = "Номер телефона")
    private String phone;

    @ApiModelProperty(value = "Пол", allowableValues = "m,f")
    private Sex sex;

    @ApiModelProperty(value = "Дата рождения")
    private Long birthday;

    @ApiModelProperty(value = "Город")
    private String city;

    @ApiModelProperty(value = "Церковь")
    private String church;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Long getBirthday() {
        return birthday;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getChurch() {
        return church;
    }

    public void setChurch(String church) {
        this.church = church;
    }
}
