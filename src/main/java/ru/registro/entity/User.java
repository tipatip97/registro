package ru.registro.entity;

import ru.registro.model.UserDTO;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class User {
    @Id
    @Column
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @Column
    private String lastName;

    @Column
    private String phone;

    private String sex;

    private Long birthday;

    private String city;

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
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

    public void fillNotNullFields(UserDTO userDTO) {
        if (userDTO.getName() != null) {
            name = userDTO.getName();
        }
        if (userDTO.getLastName() != null) {
            lastName = userDTO.getLastName();
        }
        if (userDTO.getPhone() != null) {
            phone = userDTO.getPhone();
        }
        if (userDTO.getSex() != null) {
            sex = userDTO.getSex().toString();
        }
        if (userDTO.getBirthday() != null) {
            birthday = userDTO.getBirthday();
        }
        if (userDTO.getCity() != null) {
            city = userDTO.getCity();
        }
        if (userDTO.getChurch() != null) {
            church = userDTO.getChurch();
        }
    }
}
