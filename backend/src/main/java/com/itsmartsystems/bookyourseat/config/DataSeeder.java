package com.itsmartsystems.bookyourseat.config;

import com.itsmartsystems.bookyourseat.model.Loc;
import com.itsmartsystems.bookyourseat.model.Sala;
import com.itsmartsystems.bookyourseat.repository.LocRepository;
import com.itsmartsystems.bookyourseat.repository.SalaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SalaRepository salaRepository;
    private final LocRepository locRepository;

    public DataSeeder(SalaRepository salaRepository, LocRepository locRepository) {
        this.salaRepository = salaRepository;
        this.locRepository = locRepository;
    }

    @Override
    public void run(String... args) {
        if (salaRepository.count() > 0) {
            System.out.println("Sălile există deja, seeder-ul nu rulează din nou.");
            return;
        }

        creeazaSalaCuLocuri("SD0", "Zona Stand-Up Desks", "P", "DESK_AREA", false, 8,
                new SeatGroup("P-SD0-", 1, 8));

        creeazaSalaCuLocuri("S0", "Sala Sedinte S0", "P", "MEETING_ROOM", true, 8,
                new SeatGroup("P-S0-", 1, 8));

        creeazaSalaCuLocuri("B0", "Sala Birouri B0", "P", "OFFICE_AREA", false, 12,
                new SeatGroup("P-B0-", 1, 12));

        creeazaSalaCuLocuri("E1", "Sala Evenimente E1", "T1E1", "EVENT_ROOM", true, 28,
                new SeatGroup("T1-SD1-", 1, 6),
                new SeatGroup("T1-E1-", 7, 28));

        creeazaSalaCuLocuri("S1", "Sala Sedinte S1", "T1E1", "MEETING_ROOM", true, 8,
                new SeatGroup("T1-S1-", 1, 8));

        creeazaSalaCuLocuri("G2", "Sala Gaming G2", "T1E2", "GAME_ROOM", false, 8,
                new SeatGroup("T1-G2-", 1, 8));

        creeazaSalaCuLocuri("404", "Sala 404", "T2E1", "MEETING_ROOM", true, 10,
                new SeatGroup("T2-404-", 1, 10));

        creeazaSalaCuLocuri("B1", "Sala Birouri B1", "T2E1", "OFFICE_AREA", false, 18,
                new SeatGroup("T2-B1-", 1, 18));

        creeazaSalaCuLocuri("O2", "Outland O2", "T2E2", "EVENT_ROOM", true, 10,
                new SeatGroup("T2-O2-", 1, 10));

        creeazaSalaCuLocuri("B2", "Sala Birouri B2", "T2E2", "OFFICE_AREA", false, 16,
                new SeatGroup("T2-SD2-", 1, 4),
                new SeatGroup("T2-B2-", 5, 16));

        System.out.println("Seeder terminat - săli și locuri populate cu succes!");
    }

    private void creeazaSalaCuLocuri(String cod, String name, String level, String tipSpatiu,
                                     boolean inchiriereToataSala, int capacitate, SeatGroup... grupuri) {

        Sala sala = new Sala(cod, name, level, tipSpatiu, inchiriereToataSala, capacitate, "ACTIVE");
        sala = salaRepository.save(sala);

        List<Loc> locuri = new ArrayList<>();
        for (SeatGroup grup : grupuri) {
            for (int i = grup.start; i <= grup.end; i++) {
                String codLoc = grup.prefix + String.format("%02d", i);
                locuri.add(new Loc(sala.getId(), codLoc, "ACTIVE"));
            }
        }
        locRepository.saveAll(locuri);
    }

    private static class SeatGroup {
        String prefix;
        int start;
        int end;

        SeatGroup(String prefix, int start, int end) {
            this.prefix = prefix;
            this.start = start;
            this.end = end;
        }
    }
}