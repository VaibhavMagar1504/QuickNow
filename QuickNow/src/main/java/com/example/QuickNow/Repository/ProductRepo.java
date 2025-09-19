package com.example.QuickNow.Repository;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.QuickNow.Model.Product;

@Repository
public interface ProductRepo extends  JpaRepository<Product, Integer>{
	
	   List<Product> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrCategoryContainingIgnoreCase(
	            String name, String brand, String category);
}