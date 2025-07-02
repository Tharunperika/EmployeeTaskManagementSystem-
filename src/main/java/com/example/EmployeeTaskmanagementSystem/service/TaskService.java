package com.example.EmployeeTaskmanagementSystem.service;

import com.example.EmployeeTaskmanagementSystem.entity.Task;
import com.example.EmployeeTaskmanagementSystem.entity.User;
import com.example.EmployeeTaskmanagementSystem.repository.TaskRepository;
import com.example.EmployeeTaskmanagementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public Task createTask(String title, String description, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus("PENDING");
        task.setAssignedTo(user);

        return taskRepository.save(task);
    }

    public Task updateTask(Long taskId, Task updated) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + taskId));

        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setStatus(updated.getStatus());

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Task not found with ID: " + taskId);
        }
        taskRepository.deleteById(taskId);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        return taskRepository.findByAssignedTo(user);
    }

    public Task updateStatus(Long taskId, String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + taskId));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    // ✅ Get completed tasks for task history
    public List<Task> getCompletedTasks() {
        return taskRepository.findByStatus("COMPLETED");
    }
}





