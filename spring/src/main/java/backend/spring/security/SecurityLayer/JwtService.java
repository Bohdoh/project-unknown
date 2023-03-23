package backend.spring.security.SecurityLayer;


import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@RequiredArgsConstructor
@Service
public class JwtService {

    private final EnduserRepository enduserRepository;
    private static final String SECRET_KEY = "327235753778214125442A472D4B6150645367566B59703373367639792F423F";

    public String extractUsername(String token) {
        return extractClaim (token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims (token);

        return claimsResolver.apply (claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder ()
                .setSigningKey (getSignInKey())
                .build ()
                .parseClaimsJws (token)
                .getBody ();
    }

    private Key getSignInKey() {

        byte[] keyBytes= Decoders.BASE64.decode (SECRET_KEY);

        return Keys.hmacShaKeyFor (keyBytes);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken (new HashMap<> (), userDetails);
    }


    public String generateToken(
            Map<String,Object> extraClaims,
            UserDetails userDetails
    ){

        Enduser enduser = enduserRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userDetails.getUsername()));
        extraClaims.put ("role", enduser.getRole().name());
        return Jwts
                .builder ()
                .setClaims (extraClaims)
                .setSubject (userDetails.getUsername ())
                .setIssuedAt (new Date (System.currentTimeMillis ()))
                .setExpiration (new Date (System.currentTimeMillis () + 1000 * 60 *60* 24))
                .signWith (getSignInKey (), SignatureAlgorithm.HS256)
                .compact ();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){

        final String username = extractUsername (token);

        return (username.equals (userDetails.getUsername ()))&& !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date ());
    }

    private Date extractExpiration(String token) {
        return extractClaim (token, Claims::getExpiration);
    }

}
