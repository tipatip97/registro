package ru.registro.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.registro.model.EntryRequest;
import ru.registro.model.EntryResponse;
import ru.registro.service.EntryService;

@RestController
@RequestMapping("/")
public class MainController {
    @Autowired
    private EntryService entryService;

    @ApiOperation(value = "Создание записи", response = EntryResponse.class)
    @RequestMapping(path = "add", method = RequestMethod.POST)
    public EntryResponse addEntry(
            @RequestBody EntryRequest request,
            @ApiParam(value = "id формы", required = true)
            @RequestParam String form
            ) {
        return entryService.addEntry(request, form);
    }


}
