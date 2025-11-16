package com.example.QuickNow.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuickNow.Model.Order;
import com.example.QuickNow.Model.OrderResponse;
import com.example.QuickNow.Model.User;
import com.example.QuickNow.Model.Product;
import com.example.QuickNow.Service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
	
	@Autowired
	private OrderService oService;
	
	@PostMapping("/placeOrder")
	public ResponseEntity<String> placeOrder(@RequestBody Map<String, Integer> request) {
	    try {
	        int userId = request.get("userId");
	        int productId = request.get("productId");

	        // Create lightweight references
	        User user = new User();
	        user.setId(userId);

	        Product product = new Product();
	        product.setId(productId);

	        // Create and link order
	        Order order = new Order();
	        order.setUser(user);
	        order.setProduct(product);

	        oService.placeOrder(order);
	        
	        return ResponseEntity.status(HttpStatus.CREATED)
	                             .body("Order saved successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Failed to save order: " + e.getMessage());
	    }
	}
	
	@GetMapping("/getallOrder")
	public ResponseEntity<List<OrderResponse>> getAllOrders() {
		List<OrderResponse> orders = oService.getAllOrder();
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}
	
	
	@PutMapping("/updateStatus/{orderId}")
	public ResponseEntity<String> updateOrderStatus(@PathVariable int orderId,@RequestParam String status)
	{
		boolean updated=oService.updateOrderStatuse(orderId,status);
		
		if(updated)
		{
			return ResponseEntity.ok("order status updated"+status);
		}
		else
		{
			return ResponseEntity.ok("order status fail"+status);
		}
	}
}
