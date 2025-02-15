package com.example.demo.security;

import com.example.demo.security.jwt.AuthEntryPointJwt;
import com.example.demo.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

//הגדרות אבטחה
@Configuration
@EnableMethodSecurity

public class WebSecurityConfig {

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }
  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(8);
  }


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(request -> {
              CorsConfiguration corsConfiguration = new CorsConfiguration();
              corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5175"));
              corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5174"));
              corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
              corsConfiguration.setAllowedMethods(Arrays.asList("*"));
              corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
              corsConfiguration.setAllowCredentials(true);
              return corsConfiguration;
            })) .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))

            .authorizeHttpRequests((authorize) -> {
                authorize.requestMatchers("/error").permitAll()
                      .requestMatchers("/h2-console/**").permitAll()
                      .requestMatchers("/api/users/sign**").permitAll()
                      .requestMatchers("/api/users/isExist").permitAll()
                      .requestMatchers("/api/injuries/**").permitAll()
                      .requestMatchers("/api/email/**").permitAll()
                      .requestMatchers("/api/specailistsRequests/addRequest").permitAll();

              authorize.anyRequest().authenticated();
            });


    http.headers(headers -> headers.frameOptions(frameOption -> frameOption.sameOrigin()));


    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
