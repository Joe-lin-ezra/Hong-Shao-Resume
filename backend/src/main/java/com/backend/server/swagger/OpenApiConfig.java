package com.backend.server.swagger;

//import io.swagger.annotations.Example;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Objects;

//@Configuration
//public class OpenApiConfig {
//    @Bean
//    public OpenAPI initOpenAPI() {
//        return new OpenAPI().info(
//                new Info().title("My Project API").description("OpenAPI").version("v1.0")
//        );
//    }
//}

//@Configuration
//@EnableSwagger2
public class OpenApiConfig {
//    @Bean
//    public Docket buildDocket() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                // 提供 API 相關的資訊，不想設定可以跳過這個 apiInfo call
//                .apiInfo(buildApiInf())
//                .select()
//                // 設定 base package，只有在這個 package 底下的 REST API 才會加入 Swagger 中
//                // 如果不想指定，也可以用 RequestHandlerSelectors.any() 代表所有的 REST API
//                .apis(RequestHandlerSelectors.basePackage("com.backend.server.controller"))
//                .paths(PathSelectors.any())
//                .build();
//    }
//
//    private ApiInfo buildApiInf() {
//        return new ApiInfoBuilder()
//                .title("標題:Spring Boot中使用Swagger2建構RESTful APIs")
//                .description("相關說明")
//                .termsOfServiceUrl("https://www.pixnet.net/pcard/B0212066/")
//                .license("Apache 2.0")
//                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
//                .version("1.0.0")
//                .build();
//    }
}