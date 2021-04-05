package com.roytuts.spring.openapi.documentation;

import java.util.Collections;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringOpenApiDocumentationApp {

	public static void main(String[] args) {
		SpringApplication.run(SpringOpenApiDocumentationApp.class, args);
/*
        SpringApplication app = new SpringApplication(SpringOpenApiDocumentationApp.class);

		String port = System.getenv("PORT");
		if (port == null) {
			port = "8080";
		}

        app.setDefaultProperties(Collections.singletonMap("server.port", port));
        app.run(args);
*/
	}

}
