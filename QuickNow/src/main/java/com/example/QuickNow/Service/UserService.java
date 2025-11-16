package com.example.QuickNow.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QuickNow.Model.User;
import com.example.QuickNow.Repository.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo userrepo;
	
	public User userResister(User user)
	{
		return userrepo.save(user); 
	}
	public User loginuser(User user) {
		
	User u=userrepo.findByEmail(user.getEmail());
		if(u!=null && user.getPassword().equals(u.getPassword()))
		{
			return u;
		}
		return null;
	}
}
