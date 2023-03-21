package backend.spring.security.BussinesLayer;


import backend.spring.security.DTO.AuthenticationRequest;
import backend.spring.security.DTO.AuthenticationResponse;
import backend.spring.security.DTO.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {


    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
