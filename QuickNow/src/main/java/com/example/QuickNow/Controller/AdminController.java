package com.example.QuickNow.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.QuickNow.Model.Admin;
import com.example.QuickNow.Service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173") // allow your React dev server
public class AdminController {

    @Autowired
    private AdminService adminService;

    // POST /admin/login  { "username":"admin", "password":"admin123" }
    @PostMapping("/adminlogin")
    public ResponseEntity<Map<String,String>> login(@RequestBody Admin req) {
        Admin admin = adminService.findByUsername(req.getUsername());
        if (admin != null && admin.getPassword().equals(req.getPassword())) {
            return ResponseEntity.ok(Map.of("status","success"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("status","invalid"));
        }
    }
}
