package ru.registro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.registro.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}