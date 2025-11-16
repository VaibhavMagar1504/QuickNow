package com.example.QuickNow.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.QuickNow.Model.Order;
import com.example.QuickNow.Model.OrderResponse;

public interface OrderRepo extends JpaRepository<Order, Integer> {

	@Query("SELECT new com.example.QuickNow.Model.OrderResponse(" +
		       "o.id, o.user.name, o.product.name, o.product.price, o.status, o.createAt) " +
		       "FROM Order o")
		List<OrderResponse> getAllOrder();

}
