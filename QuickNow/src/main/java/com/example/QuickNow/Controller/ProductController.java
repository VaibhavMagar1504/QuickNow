package com.example.QuickNow.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.QuickNow.Model.Product;
import com.example.QuickNow.Service.ProductService;

@RestController

@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	
	@Autowired
	ProductService service;
	
	
	@PostMapping("/addProduct")
	public String addProduct(@RequestBody Product product)
	{
		service.addProduct(product);
		return "Product save";
	}
	
	@GetMapping("/allProduct")
	public ResponseEntity< List<Product>> getAllProduct()
	{
		return new ResponseEntity<>(service.getAllProduct(),HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable("id") int id)
	{
		boolean result=service.deleteProduct(id);
		if(result) {
			return new ResponseEntity<>("delete successfully",HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>("Product not found",HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/productUpdate/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id,@RequestBody Product product)
	{
		Product product1=service.productUpdate(id,product);
		if(product1!=null)
		{
			return new ResponseEntity<>("Updated",HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>("update fail",HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getProduct/{id}")
	public  ResponseEntity<Product >getProduct(@PathVariable("id") int id)
	{
		Product p=service.getProduct(id);
		if(p!=null)
		{
			return new ResponseEntity<>(p,HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/searchProduct/{keyword}")
	public ResponseEntity<List<Product>> searchProduct(@PathVariable("keyword") String keyword)
	{
	  List<Product> products=service.searchProduct(keyword);
	  return new ResponseEntity<>(products,HttpStatus.OK);
	}
	
}
