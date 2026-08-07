package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.model.Sala;
import com.itsmartsystems.bookyourseat.repository.SalaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SalaController {

    private final SalaRepository salaRepository;

    public SalaController(SalaRepository salaRepository) {
        this.salaRepository = salaRepository;
    }

    @GetMapping("/sali")
    public List<Sala> getAllSali() {
        return salaRepository.findAll();
    }
}