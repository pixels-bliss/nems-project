package com.nems;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NemsApplication {

    public static void main(String[] args) {
        SpringApplication.run(NemsApplication.class, args);
        System.out.println("\n" +
                "=================================================\n" +
                "  NEMS Application Started Successfully!        \n" +
                "  API Base URL: http://localhost:8080/api       \n" +
                "  Health Check: http://localhost:8080/api/health\n" +
                "=================================================\n");
    }
}