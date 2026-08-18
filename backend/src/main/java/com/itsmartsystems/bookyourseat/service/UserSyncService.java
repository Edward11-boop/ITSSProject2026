package com.itsmartsystems.bookyourseat.service;

import com.itsmartsystems.bookyourseat.Role;
import com.itsmartsystems.bookyourseat.model.Department;
import com.itsmartsystems.bookyourseat.model.PostgresUser;
import com.itsmartsystems.bookyourseat.model.User;
import com.itsmartsystems.bookyourseat.repository.PostgresUserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserSyncService {
    private final PostgresUserRepository postgresUserRepository;

    public UserSyncService(PostgresUserRepository postgresUserRepository) {
        this.postgresUserRepository = postgresUserRepository;
    }

    public PostgresUser syncUser(User mongoUser) {
        PostgresUser postgresUser = postgresUserRepository.findByMongoUserId(mongoUser.getId())
                .orElseGet(PostgresUser::new);

        postgresUser.setMongoUserId(mongoUser.getId());
        postgresUser.setName(mongoUser.getName());
        postgresUser.setEmail(mongoUser.getEmail());

        Role role = Role.valueOf(mongoUser.getRole().name());
        postgresUser.setRole(role);

        Department department = Department.fromRole(role);
        if (department != null) {
            postgresUser.setDepartmentId(department.getId());
        }

        return postgresUserRepository.save(postgresUser);
    }

    public void syncUsers(Iterable<User> mongoUsers) {
        for (User mongoUser : mongoUsers) {
            syncUser(mongoUser);
        }
    }
}