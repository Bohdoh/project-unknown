package backend.spring.BussinesLayer;


import backend.spring.DAO.Role;
import backend.spring.DAO.Token;
import backend.spring.DAO.TokenType;
import backend.spring.DAO.User;
import backend.spring.DTO.AuthenticationRequest;
import backend.spring.DTO.AuthenticationResponse;
import backend.spring.DTO.RegisterRequest;
import backend.spring.Repositories.TokenRepository;
import backend.spring.Repositories.UserRepository;
import backend.spring.SecurityLayer.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {


    private final UserRepository userRepository;
    private  final PasswordEncoder passwordEncoder;

    private final TokenRepository tokenRepository;

    private  final JwtService jwtService;
    private  final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken (savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder ()
                .user (user)
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
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void revokeAllUserTokens(User user) {

        var validUserTokens = tokenRepository.findAllValidTokenByUser (user.getId ());
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
