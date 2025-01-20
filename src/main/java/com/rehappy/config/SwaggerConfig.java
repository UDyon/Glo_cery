package com.rehappy.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig { // Swagger UI: http://localhost:8080/swagger-ui.html

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Rehappy API Documentation")
                        .description("This is the API documentation for the Rehappy project.")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Support Team")
                                .email("support@rehappy.com")
                                .url("https://rehappy.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .components(new Components()
                        .addSecuritySchemes("BearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .name("Authorization")))
                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Local Development Server"),
                        new Server().url("https://api.rehappy.com").description("Production Server")
                ))
                .externalDocs(new ExternalDocumentation()
                        .description("Rehappy Project GitHub Repository")
                        .url("https://github.com/rehappy-project"));
    }
}
