package com.ideas2it.auth.service;

import com.ideas2it.auth.dto.AuthRequest;
import com.ideas2it.auth.dto.AuthResponse;
import com.ideas2it.auth.entity.Role;
import com.ideas2it.auth.entity.User;
import com.ideas2it.auth.repository.RoleRepository;
import com.ideas2it.auth.repository.UserRepository;
import com.ideas2it.auth.exception.InventoryException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        userRepository.save(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role.getName());
        String token = jwtService.generateToken(claims, user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), role.getName());
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().getName());
        String token = jwtService.generateToken(claims, user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().getName());
    }

    public boolean validate(String token) {
        try {
            jwtService.validateToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public User login(String email, String password) {
        log.info("Attempting login for email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found: {}", email);
                    return new InventoryException("Invalid email or password");
                });
        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.warn("Invalid password for user: {}", email);
            throw new InventoryException("Invalid email or password");
        }
        return user;
    }
} 