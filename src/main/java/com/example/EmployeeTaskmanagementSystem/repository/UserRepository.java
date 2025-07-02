package com.example.EmployeeTaskmanagementSystem.repository;

import com.example.EmployeeTaskmanagementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
