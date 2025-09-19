package com.example.QuickNow.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.QuickNow.Model.Product;
import com.example.QuickNow.Repository.ProductRepo;

@Service
public class ProductService {
	
	@Autowired
	ProductRepo repo;

	public void addProduct(Product product) {
		// TODO Auto-generated method stub
		product.setId(0);
		repo.save(product);
	}

	public List<Product> getAllProduct() {
		return repo.findAll();
	}

	public boolean deleteProduct(Integer id) {
		// TODO Auto-generated method stub
		if (repo.existsById(id)) {
	        repo.deleteById(id);
	        return true;
	    } else {
	        return false;
	    }
	}

	public Product productUpdate(int id, Product product) {
		
		return repo.save(product);
	}

	public Product getProduct(int id) {
		return repo.findById(id).orElse(null);  
	}

	public List<Product> searchProduct(String keyword) {
		
		 return repo.findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrCategoryContainingIgnoreCase(
	                keyword, keyword, keyword);
	}
	
	
 }
