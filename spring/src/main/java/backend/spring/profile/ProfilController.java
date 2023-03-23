package backend.spring.profile;

import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserDTO;
import backend.spring.enduser.EnduserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
@RequiredArgsConstructor
@RestController
public class ProfilController {

private final EnduserRepository enduserRepository;



    @GetMapping("/profil/{username}")
    public ResponseEntity<ProfileDTO> getEnduserByUsername(@PathVariable String username) {
        Optional<Enduser> enduserOptional = enduserRepository.findByUsername(username);
        if (enduserOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Enduser enduser = enduserOptional.get();
        ProfileDTO profileDTO = new ProfileDTO (enduser);
        return ResponseEntity.ok(profileDTO);
    }
}
