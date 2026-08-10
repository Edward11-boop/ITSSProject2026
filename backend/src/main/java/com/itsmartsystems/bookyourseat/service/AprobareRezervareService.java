package com.itsmartsystems.bookyourseat.service;


import com.itsmartsystems.bookyourseat.model.Rezervare;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.RezervareRepository;

import com.itsmartsystems.bookyourseat.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AprobareRezervareService {


    private final RezervareRepository rezervareRepository;
    private final UserRepository userRepository;

    public AprobareRezervareService(RezervareRepository rezervareRepository , UserRepository userRepository)
    {
        this.rezervareRepository = rezervareRepository;
        this.userRepository = userRepository;
    }


    public Rezervare aprobaRezervare(String idRezervare)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty())
        {
            throw new IllegalArgumentException("Utilizator inexistent!");
        }
        if(!(user.get().getRole() == User.Role.PM || user.get().getRole() == User.Role.CEO || user.get().getRole() == User.Role.MANAGER))
        {
            throw new IllegalArgumentException("Not allowed here !");
        }

        Optional<Rezervare> rezervare = rezervareRepository.findById(idRezervare);
        if(rezervare.isEmpty()) throw new IllegalArgumentException("Reservation already deleted !");
        if(!(rezervare.get().getStare() == Rezervare.Stare.IN_ASTEPTARE)) throw new IllegalArgumentException("Invalid reservation !");
        rezervare.get().setStare(Rezervare.Stare.APROBATA);
        rezervare.get().setAprobatDe(user.get().getName());
        rezervare.get().setDataAprobarii(LocalDateTime.now());
        return rezervareRepository.save(rezervare.get());
    }







}
