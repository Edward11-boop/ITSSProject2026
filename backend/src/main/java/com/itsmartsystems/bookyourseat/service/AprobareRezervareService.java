package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.RezervareRepository;
import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AprobareRezervareService {

    private final RezervareRepository rezervareRepository;
    private final UserRepository userRepository;

    public AprobareRezervareService(RezervareRepository rezervareRepository, UserRepository userRepository) {
        this.rezervareRepository = rezervareRepository;
        this.userRepository = userRepository;
    }

    public Rezervare aprobaRezervare(String idRezervare) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalArgumentException("Utilizator inexistent!");
        if (!(user.get().getRole() == User.Role.PM || user.get().getRole() == User.Role.CEO || user.get().getRole() == User.Role.MANAGER)) {
            throw new IllegalArgumentException("Not allowed here !");
        }

        Rezervare rezervare = rezervareRepository.findById(idRezervare)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found!"));
        if (rezervare.getStare() != Rezervare.Stare.IN_ASTEPTARE) {
            throw new IllegalArgumentException("Invalid reservation !");
        }

        if (rezervare.getIdSerie() == null) {
            rezervare.setStare(Rezervare.Stare.APROBATA);
            rezervare.setAprobatDe(user.get().getName());
            rezervare.setDataAprobarii(LocalDateTime.now());
            return rezervareRepository.save(rezervare);
        } else {
            List<Rezervare> serie = rezervareRepository.findByIdSerie(rezervare.getIdSerie());
            for (Rezervare r : serie) {
                if (r.getStare() == Rezervare.Stare.IN_ASTEPTARE) {
                    r.setStare(Rezervare.Stare.APROBATA);
                    r.setAprobatDe(user.get().getName());
                    r.setDataAprobarii(LocalDateTime.now());
                }
            }
            rezervareRepository.saveAll(serie);
            return rezervare;
        }
    }

    public Rezervare respingeRezervare(String idRezervare, String motivRespingere) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new IllegalArgumentException("Utilizator inexistent!");
        if (!(user.get().getRole() == User.Role.PM || user.get().getRole() == User.Role.MANAGER || user.get().getRole() == User.Role.CEO)) {
            throw new IllegalArgumentException("Nu aveți dreptul să respingeți rezervări!");
        }

        Rezervare rezervare = rezervareRepository.findById(idRezervare)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found!"));
        if (rezervare.getStare() != Rezervare.Stare.IN_ASTEPTARE) {
            throw new IllegalArgumentException("Invalid Reservation !");
        }

        if (rezervare.getIdSerie() == null) {
            rezervare.setStare(Rezervare.Stare.RESPINSA);
            rezervare.setAprobatDe(user.get().getName());
            rezervare.setMotivRespingere(motivRespingere);
            rezervare.setDataAprobarii(LocalDateTime.now());
            return rezervareRepository.save(rezervare);
        } else {
            List<Rezervare> serie = rezervareRepository.findByIdSerie(rezervare.getIdSerie());
            for (Rezervare r : serie) {
                if (r.getStare() == Rezervare.Stare.IN_ASTEPTARE) {
                    r.setStare(Rezervare.Stare.RESPINSA);
                    r.setAprobatDe(user.get().getName());
                    r.setMotivRespingere(motivRespingere);
                    r.setDataAprobarii(LocalDateTime.now());
                }
            }
            rezervareRepository.saveAll(serie);
            return rezervare;
        }
    }
}