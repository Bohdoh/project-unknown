package backend.spring.enduser;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnduserRepository extends JpaRepository<Enduser,Integer> {

    Enduser findByEnduserId(Integer id);

    Optional<Enduser> findByUsername(String username);
}
