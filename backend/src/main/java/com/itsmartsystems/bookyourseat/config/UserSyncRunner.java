package com.itsmartsystems.bookyourseat.config;

import com.itsmartsystems.bookyourseat.repository.UserRepository;
import com.itsmartsystems.bookyourseat.service.UserSyncService;
import org.springframework.boot.CommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class UserSyncRunner implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(UserSyncRunner.class);

    private final UserRepository userRepository;
    private final UserSyncService userSyncService;

    public UserSyncRunner(UserRepository userRepository, UserSyncService userSyncService) {
        this.userRepository = userRepository;
        this.userSyncService = userSyncService;
    }

    @Override
    public void run(String... args) {
        try {
            userSyncService.syncUsers(userRepository.findAll());
        } catch (RuntimeException exception) {
            log.error("User synchronization from MongoDB failed at startup. The API will remain available; check the MongoDB connection.", exception);
        }
    }
}
