package ru.registro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.registro.entity.Field;
import ru.registro.entity.User;
import ru.registro.model.EntryRequest;
import ru.registro.model.EntryResponse;
import ru.registro.model.UserDTO;
import ru.registro.repository.FieldRepository;
import ru.registro.repository.UserRepository;

@Service
public class EntryService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FieldRepository fieldRepository;

    public EntryResponse addEntry(EntryRequest request) {
        EntryResponse response = new EntryResponse();

        UserDTO userDTO = request.getUserDTO();

        if (userDTO != null) {

            User user;
            if (userDTO.getId() != null && userRepository.getOne(userDTO.getId()) != null) {
                user = userRepository.getOne(userDTO.getId());
            } else {
                user = new User();
            }

            user.setName(userDTO.getName());
            user.setLastName(userDTO.getLastName());
            user.setPhone(userDTO.getPhone());

            response.setUserId(
                    userRepository.saveAndFlush(user).getId());

            request.getFields()
                    .forEach(fieldDTO -> {
                        Field field;
                        if (fieldDTO.getId() != null && fieldRepository.getOne(fieldDTO.getId()) != null) {
                            field = fieldRepository.getOne(fieldDTO.getId());
                        } else {
                            field = new Field();
                        }

                        field.setName(fieldDTO.getName());
                        field.setValue(fieldDTO.getValue());
                        field.setForm(request.getForm());

                        fieldRepository.saveAndFlush(field);
                    });
        }

        return response;
    }
}
