/*package backend.spring.enduser;


import backend.spring.security.DAO.Role;
import backend.spring.security.DAO.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@Entity
@Table(name="Customer")
@AllArgsConstructor
@NoArgsConstructor
public class Enduser_alt implements UserDetails {

    @Id
    @GeneratedValue( strategy = GenerationType.UUID)
    private String id;

    private String firstname;

    private String lastname;


    @Column(
            columnDefinition = "TEXT"
    )
    private String email;

    private String password;

    @Enumerated(
            EnumType.STRING
    )
    private Role role;

    @OneToMany(mappedBy = "enduser")
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of (new SimpleGrantedAuthority (role.name ()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
*/