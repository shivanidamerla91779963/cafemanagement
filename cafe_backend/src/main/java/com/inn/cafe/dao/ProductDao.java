package com.inn.cafe.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.inn.cafe.model.Product;
import com.inn.cafe.wrapper.ProductWrapper;

import jakarta.transaction.Transactional;

public interface ProductDao extends JpaRepository<Product,Integer>
{
	List<ProductWrapper> getAllProduct();
	
	@Modifying
	@Transactional
	Integer updateProductStatus(@Param("status") String status,@Param("id") Integer id);
	
	List<ProductWrapper> getProductByCategory(@Param("id") Integer id);//id variable in param is after equal(same)
	
	ProductWrapper getProductById(@Param("id") Integer id);
}
