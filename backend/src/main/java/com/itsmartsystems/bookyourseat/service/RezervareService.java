package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Loc;
import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.model.Sala;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.LocRepository;
import com.itsmartsystems.bookyourseat.repository.RezervareRepository;
import com.itsmartsystems.bookyourseat.repository.SalaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RezervareService {


    private RezervareRepository rezervareRepository;
    private SalaRepository salaRepository ;
    private LocRepository locRepository;

    public RezervareService (RezervareRepository rezervareRepository ,
                             SalaRepository salaRepository,
                             LocRepository locRepository)
    {
        this.rezervareRepository = rezervareRepository;
        this.salaRepository = salaRepository;
        this.locRepository = locRepository;
    }

    public Rezervare creareRezervare(String idUtilizator, String codSala, String idLoc, LocalDateTime oraInceput, LocalDateTime oraSfarsit, Rezervare.TipRezervare tipRezervare)
    {
        Optional<Sala> sala = Optional.ofNullable(salaRepository.findByCod(codSala));
        if(sala.isEmpty()) throw new IllegalArgumentException("Sala este gresita !");
        Optional<Loc> loc = Optional.ofNullable(locRepository.findByCod(idLoc));
        if(loc.isEmpty()) throw new IllegalArgumentException("Locul pe care l-ati selectat este INDISPONIBIL");
        if(!loc.get().getSalaId().equals(sala.get().getId())) throw new IllegalArgumentException("Salile nu corespund !");

        List<Rezervare> rezervariExistente = rezervareRepository.findByIdLocAndStare(loc.get().getId() , "ACTIVA");
        for(Rezervare rezervare : rezervariExistente)
        {
            if(oraInceput.isBefore(rezervare.getOraSfarsit()) && oraSfarsit.isAfter(rezervare.getOraInceput())) throw new IllegalArgumentException("Loc rezervat in acest interval orar !");
        }
        Rezervare r = new Rezervare(
                null ,
                idUtilizator,
                sala.get().getId(),
                loc.get().getId(),
                oraInceput,
                oraSfarsit,
                "ACTIVA",
                LocalDateTime.now(),
                tipRezervare);
        return rezervareRepository.save(r);
    }

}
