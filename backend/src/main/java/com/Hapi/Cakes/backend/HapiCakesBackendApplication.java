package com.Hapi.Cakes.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;


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

		String host = parseMongoHost(uri);
		if (host == null || host.isBlank()) {
			logger.warn("MongoDB URI is set but host could not be parsed.");
		} else {
			logger.info("MongoDB host configured: {}", host);
		}
	}

	private static String parseMongoHost(String uri) {
		String trimmed = uri.trim();
		String withoutScheme;
		if (trimmed.startsWith("mongodb+srv://")) {
			withoutScheme = trimmed.substring("mongodb+srv://".length());
		} else if (trimmed.startsWith("mongodb://")) {
			withoutScheme = trimmed.substring("mongodb://".length());
		} else {
			return null;
		}

		int slashIndex = withoutScheme.indexOf('/');
		String authority = slashIndex >= 0 ? withoutScheme.substring(0, slashIndex) : withoutScheme;
		if (authority.isBlank()) {
			return null;
		}

		int atIndex = authority.lastIndexOf('@');
		String hostPort = atIndex >= 0 ? authority.substring(atIndex + 1) : authority;
		if (hostPort.isBlank()) {
			return null;
		}

		int commaIndex = hostPort.indexOf(',');
		String firstHost = commaIndex >= 0 ? hostPort.substring(0, commaIndex) : hostPort;

		int colonIndex = firstHost.lastIndexOf(':');
		return colonIndex >= 0 ? firstHost.substring(0, colonIndex) : firstHost;
	}

}
