package com.example.EmployeeTaskmanagementSystem.repository;

import com.example.EmployeeTaskmanagementSystem.entity.Task;
import com.example.EmployeeTaskmanagementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedTo(User user);
    List<Task> findByStatus(String status); // For completed tasks
}

