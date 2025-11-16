package com.example.QuickNow.Model;

import java.time.LocalDateTime;
import com.example.QuickNow.Model.Order.Status;

public class OrderResponse {

	private int orderId;
	private String userName;
	private String productName;
	private double price;
	private String status;
	private LocalDateTime createAt;

	// Constructor matching JPQL query
	public OrderResponse(int orderId, String userName, String productName, double price, Status status,
			LocalDateTime createAt) {
		this.orderId = orderId;
		this.userName = userName;
		this.productName = productName;
		this.price = price;
		this.status = status.name(); // enum to String
		this.createAt = createAt;
	}

	public OrderResponse() {
	} // default constructor

	// Getters and Setters
	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}
}
