package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.dto.InvitationRequest;
import com.itsmartsystems.bookyourseat.model.Invitation;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.service.InvitationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;
    private final PostgresUserRepository postgresUserRepository;

    public InvitationController(InvitationService invitationService, PostgresUserRepository postgresUserRepository) {
        this.invitationService = invitationService;
        this.postgresUserRepository = postgresUserRepository;
    }

    private PostgresUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<PostgresUser> user = postgresUserRepository.findByEmail(email);
        if (user.isEmpty())
            throw new IllegalArgumentException("User not found!");
        return user.get();
    }

    @PostMapping
    public ResponseEntity<Invitation> createInvitation(@RequestBody InvitationRequest cerere) {
        Invitation savedInvitation = invitationService.createInvitation(cerere);
        return ResponseEntity.ok(savedInvitation);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Invitation>> getPendingInvitations() {
        PostgresUser user = getCurrentUser();
        List<Invitation> pendingList = invitationService.getPendingInvitationsForUser(Long.valueOf(user.getId()));
        return ResponseEntity.ok(pendingList);
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<String> acceptInvitation(@PathVariable Long id) {
        invitationService.acceptInvitation(id);
        return ResponseEntity.ok("Invitatia a fost acceptata si rezervarea a fost creata automat.");
    }

    @PutMapping("/decline/{id}")
    public ResponseEntity<String> declineInvitation(@PathVariable Long id) {
        invitationService.declineInvitation(id);
        return ResponseEntity.ok("Invitatia a fost refuzata.");
    }
}