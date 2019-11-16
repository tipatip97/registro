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

    public EntryResponse addEntry(EntryRequest request, String form) {
        EntryResponse response = new EntryResponse();

        UserDTO userDTO = request.getUserDTO();

        if (userDTO != null) {

            User user;

            if (userDTO.getId() != null && userRepository.findById(userDTO.getId()).isPresent()) {
                user = userRepository.getOne(userDTO.getId());
            } else {
                user = new User();
            }

            user.fillNotNullFields(userDTO);

            response.setUserId(
                    userRepository.saveAndFlush(user).getId());

            request.getFields()
                    .stream()
                    .filter(fieldDTO -> !(fieldDTO.getName() == null || fieldDTO.getName().isEmpty() ||
                            fieldDTO.getValue() == null || fieldDTO.getValue().isEmpty()))
                    .forEach(fieldDTO -> {
                        Field field = fieldRepository.findByUserIdAndName(user.getId(), fieldDTO.getName());
                        if (field == null) {
                            field = new Field();
                            field.setName(fieldDTO.getName());
                            field.setForm(form);
                            field.setUser(user);
                        }

                        field.setValue(fieldDTO.getValue());

                        fieldRepository.saveAndFlush(field);
                    });
        }

        return response;
    }
}
