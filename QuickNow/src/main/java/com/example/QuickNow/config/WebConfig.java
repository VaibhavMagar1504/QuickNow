package com.example.QuickNow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This allows Spring Boot to serve images stored in your local folder
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/D:/Project/QuickNow_E-commerce/QuickNow/images/");
    }
}
