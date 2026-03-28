package com.Hapi.Cakes.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;

import java.net.URI;
import java.net.URISyntaxException;

@SpringBootApplication
public class HapiCakesBackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(HapiCakesBackendApplication.class);

	private final Environment environment;

	public HapiCakesBackendApplication(Environment environment) {
		this.environment = environment;
	}

	public static void main(String[] args) {
		SpringApplication.run(HapiCakesBackendApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void logMongoHost() {
		String uri = environment.getProperty("spring.data.mongodb.uri");
		if (uri == null || uri.isBlank()) {
			logger.warn("MongoDB URI is not set (spring.data.mongodb.uri is empty).");
			return;
		}

		try {
			URI parsed = new URI(uri);
			String host = parsed.getHost();
			if (host == null || host.isBlank()) {
				logger.warn("MongoDB URI is set but host could not be parsed.");
			} else {
				logger.info("MongoDB host configured: {}", host);
			}
		} catch (URISyntaxException ex) {
			logger.warn("MongoDB URI is set but invalid syntax.");
		}
	}

}
