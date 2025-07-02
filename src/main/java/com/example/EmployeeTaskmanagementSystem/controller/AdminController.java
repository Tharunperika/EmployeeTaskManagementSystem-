package com.example.EmployeeTaskmanagementSystem.controller;

import com.example.EmployeeTaskmanagementSystem.entity.Task;
import com.example.EmployeeTaskmanagementSystem.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody Map<String, String> data) {
        Task task = taskService.createTask(
            data.get("title"),
            data.get("description"),
            Long.parseLong(data.get("userId"))
        );
        return ResponseEntity.ok(task);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // ✅ New: Get only completed tasks for task history
    @GetMapping("/task-history")
    public ResponseEntity<List<Task>> getCompletedTasks() {
        return ResponseEntity.ok(taskService.getCompletedTasks());
    }
}

