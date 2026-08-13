package com.itsmartsystems.bookyourseat.config;

import com.itsmartsystems.bookyourseat.model.Floor;
import com.itsmartsystems.bookyourseat.model.Room;
import com.itsmartsystems.bookyourseat.model.Seat;
import com.itsmartsystems.bookyourseat.repository.FloorRepository;
import com.itsmartsystems.bookyourseat.repository.RoomRepository;
import com.itsmartsystems.bookyourseat.repository.SeatRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

        private final FloorRepository floorRepository;
        private final RoomRepository roomRepository;
        private final SeatRepository locRepository;

        public DataSeeder(FloorRepository floorRepository, RoomRepository roomRepository,
                        SeatRepository locRepository) {
                this.floorRepository = floorRepository;
                this.roomRepository = roomRepository;
                this.locRepository = locRepository;
        }

        @Override
        public void run(String... args) {
                if (roomRepository.count() > 0) {
                        System.out.println("Sălile există deja, seeder-ul nu rulează din nou.");
                        return;
                }

                Floor etajP = floorRepository.save(new Floor("P"));
                Floor etajT1E1 = floorRepository.save(new Floor("T1E1"));
                Floor etajT1E2 = floorRepository.save(new Floor("T1E2"));
                Floor etajT2E1 = floorRepository.save(new Floor("T2E1"));
                Floor etajT2E2 = floorRepository.save(new Floor("T2E2"));

                creeazaSalaCuLocuri("SD0", "Zona Stand-Up Desks", etajP, "DESK_AREA", 8L,
                                new SeatGroup("P-SD0-", 1, 8));

                creeazaSalaCuLocuri("S0", "Room Sedinte S0", etajP, "MEETING_ROOM", 8L,
                                new SeatGroup("P-S0-", 1, 8));

                creeazaSalaCuLocuri("B0", "Room Birouri B0", etajP, "OFFICE_AREA", 12L,
                                new SeatGroup("P-B0-", 1, 12));

                creeazaSalaCuLocuri("E1", "Room Evenimente E1", etajT1E1, "EVENT_ROOM", 28L,
                                new SeatGroup("T1-SD1-", 1, 6),
                                new SeatGroup("T1-E1-", 7, 28));

                creeazaSalaCuLocuri("S1", "Room Sedinte S1", etajT1E1, "MEETING_ROOM", 8L,
                                new SeatGroup("T1-S1-", 1, 8));

                creeazaSalaCuLocuri("G2", "Room Gaming G2", etajT1E2, "GAME_ROOM", 8L,
                                new SeatGroup("T1-G2-", 1, 8));

                creeazaSalaCuLocuri("404", "Room 404", etajT2E1, "MEETING_ROOM", 10L,
                                new SeatGroup("T2-404-", 1, 10));

                creeazaSalaCuLocuri("B1", "Room Birouri B1", etajT2E1, "OFFICE_AREA", 18L,
                                new SeatGroup("T2-B1-", 1, 18));

                creeazaSalaCuLocuri("O2", "Outland O2", etajT2E2, "EVENT_ROOM", 10L,
                                new SeatGroup("T2-O2-", 1, 10));

                creeazaSalaCuLocuri("B2", "Room Birouri B2", etajT2E2, "OFFICE_AREA", 16L,
                                new SeatGroup("T2-SD2-", 1, 4),
                                new SeatGroup("T2-B2-", 5, 16));

                System.out.println("Seeder terminat - săli și locuri populate cu succes!");
        }

        private void creeazaSalaCuLocuri(String cod, String name, Floor floor, String tipSpatiu,
                        Long capacitate, SeatGroup... grupuri) {

                Room room = new Room(null, floor, cod, name, tipSpatiu, capacitate);
                room = roomRepository.save(room);

                List<Seat> locuri = new ArrayList<>();
                for (SeatGroup grup : grupuri) {
                        for (int i = grup.start; i <= grup.end; i++) {
                                String codLoc = grup.prefix + String.format("%02d", i);

                                locuri.add(new Seat(null, room, codLoc, "ACTIVE", "STANDARD"));
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