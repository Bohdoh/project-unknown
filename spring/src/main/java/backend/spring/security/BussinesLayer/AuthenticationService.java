package backend.spring.security.BussinesLayer;


import backend.spring.exeptions.UserAlreadyExistsException;
import backend.spring.exeptions.UserDoesntExistException;
import backend.spring.security.DTO.AuthenticationRequest;
import backend.spring.security.DTO.AuthenticationResponse;
import backend.spring.security.DTO.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {


    AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException;

    AuthenticationResponse authenticate(AuthenticationRequest request) throws UserDoesntExistException;
}
