package com.example.demo.controller;

import com.example.demo.model.Users;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.service.GeocodingService;
import com.example.demo.service.RoleRepository;
import com.example.demo.service.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private GeocodingService geocodingService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/allUsers")
    public ResponseEntity<List<Users>> getUsers() {
        try {
            return new ResponseEntity<>(usersRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/usersById/{id}")
    public ResponseEntity<Users> getUsersById(@PathVariable Long id) {
        try {
            Users users = usersRepository.findById(id).orElse(null);
            if (users == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOut() {
        try {
            ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body("you've been signed out!");
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signUpUser")
    public ResponseEntity<Users> addUsers(@RequestBody Users user) {
        try {
            Optional<Users> existingUser = usersRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }

            user.setPassword(new BCryptPasswordEncoder(8).encode(user.getPassword()));
            user.getRoles().add(roleRepository.findById((long) 1).get());

            Users newUser = usersRepository.save(user);

            double[] coordinates = geocodingService.getCoordinatesFromAddress(newUser.getAddress());
            newUser.setLatitude(coordinates[0]);
            newUser.setLongitude(coordinates[1]);

            if (newUser.getId() == null) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateUsers/{id}")
    public ResponseEntity<Users> updateUsers(@RequestBody Users user, @PathVariable Long id) {
        try {
            Users u = usersRepository.findById(id).orElse(null);
            if (u == null || u.getId() != id) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            user.setPassword(new BCryptPasswordEncoder(8).encode(user.getPassword()));

            double[] coordinates = geocodingService.getCoordinatesFromAddress(user.getAddress());
            user.setLatitude(coordinates[0]);
            user.setLongitude(coordinates[1]);

            Users updatedUsers = usersRepository.save(user);
            return new ResponseEntity<>(updatedUsers, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteUsers/{id}")
    public ResponseEntity<Users> deleteCourse(@PathVariable Long id) {
        try {
            Users users = usersRepository.findById(id).orElse(null);
            if (users == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            usersRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/isExist")
    public ResponseEntity<Users> isExist(@RequestBody Users user) {
        try {
            Users checku = usersRepository.findByEmail(user.getEmail()).orElse(null);
            if (checku == null || checku.getId() == null || !checku.getName().equals(user.getName())) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            Users u = usersRepository.findByName(user.getName());
            user.setId(u.getId());
            user.setAddress(u.getAddress());
            user.setSpecialization(u.getSpecialization());

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body(user);
        } catch (AuthenticationException ex) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}