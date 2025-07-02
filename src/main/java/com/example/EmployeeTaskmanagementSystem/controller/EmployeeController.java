package com.example.EmployeeTaskmanagementSystem.controller;

import com.example.EmployeeTaskmanagementSystem.entity.Task;
import com.example.EmployeeTaskmanagementSystem.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private TaskService taskService;

    // ✅ Get all tasks assigned to an employee
    @GetMapping("/tasks/{userId}")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long userId) {
        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }

    // ✅ Update task status from body (e.g., PENDING → COMPLETED)
    @PutMapping("/task-status/{id}")
    public ResponseEntity<Task> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ResponseEntity.ok(taskService.updateStatus(id, status));
    }

    // ✅ Shortcut endpoint to mark a task as COMPLETED
    @PutMapping("/task/{taskId}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.updateStatus(taskId, "COMPLETED"));
    }
}


