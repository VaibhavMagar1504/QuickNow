package com.example.QuickNow.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuickNow.Model.User;
import com.example.QuickNow.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	UserService service;
	
	@PostMapping("/userReg")
	public ResponseEntity<User> resiter(@RequestBody User user)
	{
		return new ResponseEntity<User>(service.userResister(user),HttpStatus.OK);
	}
	
	@PostMapping("/userLogin")
	public ResponseEntity<User> login(@RequestBody User user)
	{
		return new ResponseEntity<User>(service.loginuser(user),HttpStatus.OK);
	}
}
