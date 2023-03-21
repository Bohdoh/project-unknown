package backend.spring.security.Repositories;

import backend.spring.security.DAO.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);

}
