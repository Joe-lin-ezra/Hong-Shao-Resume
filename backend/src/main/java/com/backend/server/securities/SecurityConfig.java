package com.backend.server.securities;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    //        http
    //            .authorizeRequests() // 定義哪些url需要被保護
    //            .antMatchers("/").permitAll()  // 定義匹配到"/" 不需要驗證
    //            .antMatchers("/swagger-ui.html").permitAll() // 匹配到"/swagger-ui.html", 不需要身份驗證

    http.authorizeRequests().anyRequest().permitAll();

    http.cors().and().csrf().disable();

    // ref: https://www.1ju.org/article/spring-prevent-xss
    http.headers().xssProtection().and().contentSecurityPolicy("script-src 'self'");
    //        http.csrf().disable().exceptionHandling().authenticationEntryPoint();
  }
}
