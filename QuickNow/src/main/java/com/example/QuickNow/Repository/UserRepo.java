package com.example.QuickNow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.QuickNow.Model.User;

public interface UserRepo extends JpaRepository<User, Integer>{
	
	User findByEmail(String email);
}
