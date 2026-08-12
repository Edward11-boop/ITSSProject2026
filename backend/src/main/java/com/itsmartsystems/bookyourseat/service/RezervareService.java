package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Loc;
import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.model.Sala;
import com.itsmartsystems.bookyourseat.repository.LocRepository;
import com.itsmartsystems.bookyourseat.repository.RezervareRepository;
import com.itsmartsystems.bookyourseat.repository.SalaRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RezervareService {

    private final RezervareRepository rezervareRepository;
    private final SalaRepository salaRepository;
    private final LocRepository locRepository;

    public RezervareService(RezervareRepository rezervareRepository, SalaRepository salaRepository,
            LocRepository locRepository) {
        this.rezervareRepository = rezervareRepository;
        this.salaRepository = salaRepository;
        this.locRepository = locRepository;
    }

    public void creareRezervare(String idUtilizator, String codSala, String idLoc, LocalDateTime oraInceput,
            LocalDateTime oraSfarsit, Rezervare.TipRezervare tipRezervare, LocalDate dataSfarsitRecurenta) {

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

        List<Rezervare> rezervariExistente = rezervareRepository.findByIdLocAndStare(Long.valueOf(loc.get().getId()),
                Rezervare.Stare.APROBATA);
        for (Rezervare rezervare : rezervariExistente) {
            if (oraInceput.isBefore(rezervare.getOraSfarsit()) && oraSfarsit.isAfter(rezervare.getOraInceput())) {
                throw new IllegalArgumentException("Loc rezervat in acest interval orar!");
            }
        }

        Rezervare rezervare;
        if (tipRezervare == Rezervare.TipRezervare.UNICA) {
            rezervare = new Rezervare(
                    null,
                    Long.valueOf(idUtilizator),
                    Long.valueOf(sala.get().getId()),
                    Long.valueOf(loc.get().getId()),
                    oraInceput,
                    oraSfarsit,
                    Rezervare.Stare.IN_ASTEPTARE,
                    LocalDateTime.now(),
                    tipRezervare);
            rezervareRepository.save(rezervare);
        } else {
            String idSerie = UUID.randomUUID().toString();
            List<Rezervare> rezervariRecurente = new ArrayList<>();
            LocalDate ziCurenta = oraInceput.toLocalDate();

            while (ziCurenta.isBefore(dataSfarsitRecurenta) || ziCurenta.isEqual(dataSfarsitRecurenta)) {
                DayOfWeek day = ziCurenta.getDayOfWeek();

                if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
                    LocalDateTime inceputZi = ziCurenta.atTime(oraInceput.toLocalTime());
                    LocalDateTime sfarsitZi = ziCurenta.atTime(oraSfarsit.toLocalTime());

                    Rezervare rezervareZi = new Rezervare(
                            idSerie,
                            Long.valueOf(idUtilizator),
                            Long.valueOf(sala.get().getId()),
                            Long.valueOf(loc.get().getId()),
                            inceputZi,
                            sfarsitZi,
                            Rezervare.Stare.IN_ASTEPTARE,
                            LocalDateTime.now(),
                            tipRezervare);
                    rezervariRecurente.add(rezervareZi);
                }
                ziCurenta = ziCurenta.plusDays(1);
            }
            rezervareRepository.saveAll(rezervariRecurente);
        }
    }

    public void stergereRezervare(String id) {
        Rezervare rezervare = rezervareRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalida!"));
        rezervareRepository.delete(rezervare);
    }

    public Rezervare modificareRezervare(String id, String idUtilizator, String codSala, String idLoc,
            LocalDateTime oraInceput, LocalDateTime oraSfarsit, Rezervare.TipRezervare tipRezervare) {

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

        List<Rezervare> rezervariExistente = rezervareRepository.findByIdLocAndStare(Long.valueOf(loc.get().getId()),
                Rezervare.Stare.APROBATA);
        for (Rezervare rezervare : rezervariExistente) {
            if (rezervare.getId().equals(id))
                continue;
            if (oraInceput.isBefore(rezervare.getOraSfarsit()) && oraSfarsit.isAfter(rezervare.getOraInceput())) {
                throw new IllegalArgumentException("Loc rezervat in acest interval orar!");
            }
        }

        Rezervare rezervare = rezervareRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalArgumentException("Rezervare invalida!"));

        rezervare.setIdUtilizator(Long.valueOf(idUtilizator));
        rezervare.setIdSala(Long.valueOf(sala.get().getId()));
        rezervare.setIdLoc(Long.valueOf(loc.get().getId()));
        rezervare.setOraInceput(oraInceput);
        rezervare.setOraSfarsit(oraSfarsit);
        rezervare.setTipRezervare(tipRezervare);

        return rezervareRepository.save(rezervare);
    }

    public List<Rezervare> istoricRezervari(String idUtilizator) {
        return rezervareRepository.findByIdUtilizator(Long.valueOf(idUtilizator));
    }

    public List<Rezervare> rezervariInAsteptare() {
        return rezervareRepository.findByStare(Rezervare.Stare.IN_ASTEPTARE);
    }

    public List<String> locuriOcupate(String idSala, LocalDateTime oraInceput, LocalDateTime oraSfarsit) {
        List<Rezervare> rezervari = rezervareRepository.findByIdSalaAndStare(Long.valueOf(idSala),
                Rezervare.Stare.APROBATA);
        List<String> locuriOcupate = new ArrayList<>();
        for (Rezervare r : rezervari) {
            if (oraInceput.isBefore(r.getOraSfarsit()) && oraSfarsit.isAfter(r.getOraInceput())) {
                locuriOcupate.add(String.valueOf(r.getIdLoc()));
            }
        }
        return locuriOcupate;
    }
}