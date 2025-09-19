package com.example.QuickNow.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.QuickNow.Model.User;
import com.example.QuickNow.Repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	@Autowired
	PasswordEncoder passwordEncoded;
	
	public User userResister(User user)
	{
		user.setPassword(passwordEncoded.encode(user.getPassword()));
		return repo.save(user); 
	}

	public User loginuser(User user) {
		User u = repo.findByName(user.getName());
		if(u!=null && passwordEncoded.matches(user.getPassword(), u.getPassword()))
		{
			return u;
		}
		return null;
	}
}
