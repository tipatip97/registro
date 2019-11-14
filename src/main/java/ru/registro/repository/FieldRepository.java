package ru.registro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.registro.entity.Field;

public interface FieldRepository extends JpaRepository<Field, Long> {

}