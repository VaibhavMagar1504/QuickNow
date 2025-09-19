package com.example.QuickNow.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QuickNow.Model.Admin;
import com.example.QuickNow.Repository.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin findByUsername(String username) {
        return adminRepo.findByUsername(username);

    }
}
