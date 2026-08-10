package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Loc;
import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.model.Sala;
import com.itsmartsystems.bookyourseat.repository.LocRepository;
import com.itsmartsystems.bookyourseat.repository.RezervareRepository;
import com.itsmartsystems.bookyourseat.repository.SalaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RezervareService {

    private final RezervareRepository rezervareRepository;
    private final SalaRepository salaRepository;
    private final LocRepository locRepository;

    public RezervareService(RezervareRepository rezervareRepository, SalaRepository salaRepository, LocRepository locRepository) {
        this.rezervareRepository = rezervareRepository;
        this.salaRepository = salaRepository;
        this.locRepository = locRepository;
    }

    public Rezervare creareRezervare(String idUtilizator, String codSala, String idLoc, LocalDateTime oraInceput, LocalDateTime oraSfarsit, Rezervare.TipRezervare tipRezervare) {

        Optional<Sala> sala = Optional.ofNullable(salaRepository.findByCod(codSala));
        if (sala.isEmpty()) {
            throw new IllegalArgumentException("Sala este gresita!");
        }

        Optional<Loc> loc = Optional.ofNullable(locRepository.findByCod(idLoc));
        if (loc.isEmpty()) {
            throw new IllegalArgumentException("Locul selectat este indisponibil!");
        }

        if (!loc.get().getSalaId().equals(sala.get().getId())) {
            throw new IllegalArgumentException("Sala si locul nu corespund!");
        }

        List<Rezervare> rezervariExistente = rezervareRepository.findByIdLocAndStare(loc.get().getId(), Rezervare.Stare.APROBATA);
        for (Rezervare rezervare : rezervariExistente) {
            if (oraInceput.isBefore(rezervare.getOraSfarsit()) && oraSfarsit.isAfter(rezervare.getOraInceput())) {
                throw new IllegalArgumentException("Loc rezervat in acest interval orar!");
            }
        }

        Rezervare rezervare = new Rezervare(
                null,
                idUtilizator,
                sala.get().getId(),
                loc.get().getId(),
                oraInceput,
                oraSfarsit,
                Rezervare.Stare.IN_ASTEPTARE,
                LocalDateTime.now(),
                tipRezervare
        );

        return rezervareRepository.save(rezervare);
    }

    public void stergereRezervare(String id) {
        Rezervare rezervare = rezervareRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalida!"));

        rezervareRepository.delete(rezervare);
    }

    public Rezervare modificareRezervare(String id, String idUtilizator, String codSala, String idLoc, LocalDateTime oraInceput, LocalDateTime oraSfarsit, Rezervare.TipRezervare tipRezervare) {

        Optional<Sala> sala = Optional.ofNullable(salaRepository.findByCod(codSala));
        if (sala.isEmpty()) {
            throw new IllegalArgumentException("Sala este goala!");
        }

        Optional<Loc> loc = locRepository.findById(idLoc);
        if (loc.isEmpty()) {
            throw new IllegalArgumentException("Locul este indisponibil!");
        }

        if (!loc.get().getSalaId().equals(sala.get().getId())) {
            throw new IllegalArgumentException("Salile nu corespund!");
        }

        List<Rezervare> rezervariExistente = rezervareRepository.findByIdLocAndStare(loc.get().getId(), Rezervare.Stare.APROBATA);

        for (Rezervare rezervare : rezervariExistente) {
            if (rezervare.getId().equals(id)) {
                continue;
            }

            if (oraInceput.isBefore(rezervare.getOraSfarsit()) && oraSfarsit.isAfter(rezervare.getOraInceput())) {
                throw new IllegalArgumentException("Loc rezervat in acest interval orar!");
            }
        }

        Rezervare rezervare = rezervareRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalida!"));

        rezervare.setIdUtilizator(idUtilizator);
        rezervare.setIdSala(sala.get().getId());
        rezervare.setIdLoc(loc.get().getId());
        rezervare.setOraInceput(oraInceput);
        rezervare.setOraSfarsit(oraSfarsit);
        rezervare.setTipRezervare(tipRezervare);

        return rezervareRepository.save(rezervare);
    }

    public List<Rezervare> istoricRezervari(String idUtilizator) {
        return rezervareRepository.findByIdUtilizator(idUtilizator);
    }
}