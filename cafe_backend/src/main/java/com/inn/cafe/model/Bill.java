package com.inn.cafe.model;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;


@NamedQuery(name="Bill.getAllBills",query="select b from Bill b order by b.id desc")

@NamedQuery(name="Bill.getBillByUserName",query="select b from Bill b where b.createdBy=:username order by b.id desc")

//@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name="bill")
public class Bill implements Serializable
{
	private static final long serialVersionUID=1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	
	@Column(name="uuid")
	private String uuid;
	
	@Column(name="name")
	private  String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="contactNumber")
	private String contactNumber;
	
	@Column(name="paymentmethod")
	private String paymentMethod;
	
	@Column(name="total")
	private Integer total;
	
	//storing purchased data into database in the form of json
	@Column(name="productdetails",columnDefinition="json")
	private String productDetail;
	
	//user who generated this bill
	@Column(name="createdby")
	private String createdBy;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public String getProductDetail() {
		return productDetail;
	}

	public void setProductDetail(String productDetail) {
		this.productDetail = productDetail;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Bill(Integer id, String uuid, String name, String email, String contactNumber, String paymentMethod,
			Integer total, String productDetail, String createdBy) {
		super();
		this.id = id;
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.contactNumber = contactNumber;
		this.paymentMethod = paymentMethod;
		this.total = total;
		this.productDetail = productDetail;
		this.createdBy = createdBy;
	}

	public Bill() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
