package com.itsmartsystems.bookyourseat.controller;

import com.itsmartsystems.bookyourseat.model.Invitation;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import com.itsmartsystems.bookyourseat.service.InvitationService;
import com.itsmartsystems.bookyourseat.dto.InvitationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @Autowired
    private PostgresUserRepository postgresUserRepository;

    private PostgresUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Optional<PostgresUser> user = postgresUserRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found!");
        }
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
        List<Invitation> pendingList = invitationService.getPendingInvitationsForUser(user.getId());
        return ResponseEntity.ok(pendingList);
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<Void> acceptInvitation(@PathVariable Long id) {
        invitationService.acceptInvitation(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/decline")
    public ResponseEntity<Void> declineInvitation(@PathVariable Long id) {
        invitationService.declineInvitation(id);
        return ResponseEntity.ok().build();
    }
}