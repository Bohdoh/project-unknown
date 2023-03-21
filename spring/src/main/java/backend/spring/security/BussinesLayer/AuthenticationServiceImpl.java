package backend.spring.security.BussinesLayer;


import backend.spring.security.DAO.Role;
import backend.spring.security.DAO.Token;
import backend.spring.security.DAO.TokenType;
import backend.spring.enduser.Enduser;
import backend.spring.security.DTO.AuthenticationRequest;
import backend.spring.security.DTO.AuthenticationResponse;
import backend.spring.security.DTO.RegisterRequest;
import backend.spring.security.Repositories.TokenRepository;
import backend.spring.enduser.EnduserRepository;
import backend.spring.security.SecurityLayer.JwtService;
import lombok.RequiredArgsConstructor;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final EnduserRepository enduserRepository;

    private  final PasswordEncoder passwordEncoder;

    private final TokenRepository tokenRepository;

    private  final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = Enduser.builder()
                .username (request.getUsername ())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        var savedUser = enduserRepository.save(user);
        //var jwtToken = jwtService.generateToken(user);
       // saveUserToken (savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .username (savedUser.getUsername ())
               // .token(jwtToken)
                .build();

    }

    private void saveUserToken(Enduser enduser, String jwtToken) {
        var token = Token.builder ()
                .enduser (enduser)
                .token (jwtToken)
                .tokenType (TokenType.BEARER)
                .revoked (false)
                .expired (false)
                .build ();

        tokenRepository.save (token);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken (
                        request.getUsername (),
                        request.getPassword()
                )
        );
        var user = enduserRepository.findByUsername (request.getUsername ())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .username (user.getUsername ())
                .token(jwtToken)
                .role(user.getRole().toString())
                .build();
    }

    private void revokeAllUserTokens(Enduser enduser) {

        var validUserTokens = tokenRepository.findAllValidTokenByUser (enduser.getEnduserId ());
        if (validUserTokens.isEmpty ()){
               return;
        }
        validUserTokens.forEach (t -> {
            t.setRevoked (true);
            t.setExpired (true);
        });
        tokenRepository.saveAll (validUserTokens);



    }
}
