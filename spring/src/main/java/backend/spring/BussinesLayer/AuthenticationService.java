package backend.spring.BussinesLayer;


import backend.spring.DTO.AuthenticationRequest;
import backend.spring.DTO.AuthenticationResponse;
import backend.spring.DTO.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {


    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
