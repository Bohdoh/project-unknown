package backend.spring.enduser;

import backend.spring.security.DAO.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnduserDTO {
    private String username;
    private String image;
    private Role role;
    public EnduserDTO(Enduser enduser) {
        this.username = enduser.getUsername ();
        this.image = enduser.getImage ();
        this.role=enduser.getRole ();
    }
}
