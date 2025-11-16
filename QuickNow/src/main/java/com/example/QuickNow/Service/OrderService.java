package com.example.QuickNow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QuickNow.Model.Order;
import com.example.QuickNow.Model.OrderResponse;
import com.example.QuickNow.Repository.OrderRepo;

@Service
public class OrderService {

	@Autowired
	OrderRepo orepo;
	
	public void placeOrder(Order order) {
		
		orepo.save(order);
	}

	public List<OrderResponse> getAllOrder() {
		
		return orepo.getAllOrder();
	}

	public boolean updateOrderStatuse(int orderId, String status) {
		
		Order order=orepo.findById(orderId).orElse(null);
		if(order==null)
		{
			return false;
		}
		else
		{
			order.setStatus(Order.Status.valueOf(status.toUpperCase()));
			orepo.save(order);
			return true;
		}
	}
		
}
