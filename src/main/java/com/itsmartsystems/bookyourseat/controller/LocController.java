package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.model.Loc;
import com.itsmartsystems.bookyourseat.repository.LocRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocController {

    private final LocRepository locRepository;

    public LocController(LocRepository locRepository) {
        this.locRepository = locRepository;
    }

    @GetMapping("/locuri")
    public List<Loc> getAllLocuri() {
        return locRepository.findAll();
    }

    @GetMapping("/locuri/sala/{salaId}")
    public List<Loc> getLocuriDinSala(@PathVariable String salaId) {
        return locRepository.findBySalaId(salaId);
    }
}