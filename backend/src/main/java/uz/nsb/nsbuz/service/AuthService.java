package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.*;
import uz.nsb.nsbuz.dto.response.*;
import uz.nsb.nsbuz.exception.BadRequestException;
import uz.nsb.nsbuz.mapper.UserMapper;
import uz.nsb.nsbuz.model.User;
import uz.nsb.nsbuz.repository.UserRepository;
import uz.nsb.nsbuz.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtProvider;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Bu email allaqachon ro'yxatdan o'tgan");
        }
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .build();
        User saved = userRepo.save(user);
        log.info("User registered: {}", saved.getEmail());
        return buildAuthResponse(saved);
    }

    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadRequestException("Foydalanuvchi topilmadi"));
        log.info("User logged in: {} (role: {})", user.getEmail(), user.getRole());
        return buildAuthResponse(user);
    }

    public UserResponse getProfile(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Foydalanuvchi topilmadi"));
        return userMapper.toResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtProvider.generateToken(user.getEmail());
        return AuthResponse.builder()
                .token(token)
                .user(userMapper.toResponse(user))
                .build();
    }
}
