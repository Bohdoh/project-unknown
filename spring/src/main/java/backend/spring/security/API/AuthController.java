package backend.spring.security.API;

import backend.spring.exeptions.UserAlreadyExistsException;
import backend.spring.exeptions.UserDoesntExistException;
import backend.spring.security.BussinesLayer.AuthenticationService;
import backend.spring.security.DTO.AuthenticationRequest;
import backend.spring.security.DTO.AuthenticationResponse;
import backend.spring.security.DTO.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthController {

    private final AuthenticationService authenticationService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.register(request));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }



    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ){
    try{
        return ResponseEntity.ok (authenticationService.authenticate(request));
    }catch (UserDoesntExistException e){
        return ResponseEntity.status (HttpStatus.BAD_REQUEST).body (e.getMessage ());
    }


    }

}
