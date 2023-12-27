package com.inn.cafe.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.inn.cafe.rest.DashBoardRest;
import com.inn.cafe.service.DashBoardService;

@RestController
public class DashBoardRestImpl implements DashBoardRest 
{
	@Autowired
	DashBoardService dashboardService;

	@Override
	public ResponseEntity<Map<String, Object>> getCount() {
		return dashboardService.getCount();
	}
	
}
