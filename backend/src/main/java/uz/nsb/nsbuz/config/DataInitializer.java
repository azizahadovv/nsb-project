package uz.nsb.nsbuz.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.model.User;
import uz.nsb.nsbuz.repository.UserRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@nsb.uz")) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@nsb.uz")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .phone("+998901234567")
                    .blocked(false)
                    .build();
            userRepository.save(admin);
            log.info("Admin user created: admin@nsb.uz / admin123");
        } else {
            log.info("Admin user already exists");
        }
    }
}
