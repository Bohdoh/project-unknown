package backend.spring.security.SecurityLayer;

import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserRepository;
import backend.spring.security.DAO.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class ApplicationInitializer {

    @Bean
    public CommandLineRunner createDefaultAdminUser(EnduserRepository enduserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultAdminUsername = "admin";
            String defaultAdminPassword = "admin";

            if (!enduserRepository.findByUsername(defaultAdminUsername).isPresent()) {
                Enduser admin = Enduser.builder()
                        .username(defaultAdminUsername)
                        .email("admin@example.com")
                        .password(passwordEncoder.encode(defaultAdminPassword))
                        .role(Role.ADMIN)
                        .build();

                enduserRepository.save(admin);
            }
        };
    }

    @Bean
    public CommandLineRunner createDefaultUser(EnduserRepository enduserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultUserUsername = "user";
            String defaultUserPassword = "user";

            if (!enduserRepository.findByUsername(defaultUserUsername).isPresent()) {
                Enduser user = Enduser.builder()
                        .username(defaultUserUsername)
                        .email("user@example.com")
                        .password(passwordEncoder.encode(defaultUserPassword))
                        .role(Role.USER)
                        .build();

                enduserRepository.save(user);
            }
        };
    }



}