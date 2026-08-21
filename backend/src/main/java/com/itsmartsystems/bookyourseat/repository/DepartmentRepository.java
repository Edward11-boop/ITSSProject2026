package com.itsmartsystems.bookyourseat.repository;

import com.itsmartsystems.bookyourseat.model.Department;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class DepartmentRepository {

    public Optional<Department> findByName(String name) {
        if (name == null) {
            return Optional.empty();
        }

        for (Department department : Department.values()) {
            if (department.getName().equalsIgnoreCase(name)) {
                return Optional.of(department);
            }
        }

        return Optional.empty();
    }

    public Optional<Department> findByNameIgnoreCase(String name) {
        return findByName(name);
    }

    public Optional<Department> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }

        for (Department department : Department.values()) {
            if (department.getId() == id.intValue()) {
                return Optional.of(department);
            }
        }

        return Optional.empty();
    }

    public boolean existsByName(String name) {
        return findByName(name).isPresent();
    }
}