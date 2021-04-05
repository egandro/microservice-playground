package com.roytuts.spring.openapi.documentation.rest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.extensions.Extension;
import io.swagger.v3.oas.annotations.extensions.ExtensionProperty;
import io.swagger.v3.oas.annotations.Operation;

@RestController
public class RestApi {

	@GetMapping("/spring/hello")
	public ResponseEntity<String> hello() {
		return new ResponseEntity<String>("Hello World!", HttpStatus.OK);
	}

	@PostMapping("/spring/greet")
	public ResponseEntity<String> greet(@RequestBody String name) {
		return new ResponseEntity<String>("Hello, " + name, HttpStatus.OK);
	}

	@GetMapping("/spring/secret")
	@Operation(description = "I am a secret method", extensions = {
		// no scalar extension is possible... java sucks
		@Extension(name = "x-internal", properties = {
			@ExtensionProperty(name = "java", value = "sucks")}
		)
	})
	public ResponseEntity<String> secret() {
		return new ResponseEntity<String>("I am very secret", HttpStatus.OK);
	}


}
