package backend.spring.enduser;


import org.springframework.data.jpa.repository.JpaRepository;

public interface EnduserRepository extends JpaRepository<Enduser,Integer> {
    Enduser findByUsername(String username);
    Enduser findByEnduserId(Integer id);

}
