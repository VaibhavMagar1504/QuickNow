package com.example.QuickNow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.QuickNow.Model.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Admin findByUsername(String username);
    
}
