package backend.spring.Repositories;

import backend.spring.DAO.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,String> {

    Optional<User> findByEmail(String email);

}
