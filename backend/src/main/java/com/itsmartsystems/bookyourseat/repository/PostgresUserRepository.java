package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.PostgresUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostgresUserRepository extends JpaRepository<PostgresUser, Integer> {
    Optional<PostgresUser> findByMongoUserId(String mongoUserId);
}