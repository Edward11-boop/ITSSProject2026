package com.itsmartsystems.bookyourseat.util;

import com.itsmartsystems.bookyourseat.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Profile("cleanup")
public class CleanupNotificationsRunner implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(CleanupNotificationsRunner.class);
    private final NotificationRepository notificationRepository;

    public CleanupNotificationsRunner(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("[cleanup] Starting mock notification cleanup...");
        List<String> types = List.of("MOCK", "SAMPLE", "TEST");
        int deleted = notificationRepository.deleteMockNotifications("mock", types);
        log.info("[cleanup] Deleted {} notification(s) matching pattern/type criteria.", deleted);
        log.info("[cleanup] Completed. Exiting application to avoid running normal server.");
        // Exit so the app doesn't continue running under the cleanup profile
        System.exit(0);
    }
}
