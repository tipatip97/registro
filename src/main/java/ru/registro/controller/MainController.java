package ru.registro.controller;

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

    @RequestMapping(path = "add", method = RequestMethod.POST)
    public EntryResponse addEntry(
            @RequestBody EntryRequest request,
            @RequestParam String form
            ) {
        return entryService.addEntry(request, form);
    }


}
