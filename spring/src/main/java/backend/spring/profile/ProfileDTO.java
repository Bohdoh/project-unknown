package backend.spring.profile;


import backend.spring.enduser.Enduser;
import backend.spring.security.DAO.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private Integer enduserId;
    private String username;
    private String email;
    private String image;
    private Role role;

    public ProfileDTO(Enduser enduser){
        this.enduserId = enduser.getEnduserId();
        this.username = enduser.getUsername();
        this.email = enduser.getEmail();
        this.image = enduser.getImage();
        this.role = enduser.getRole();
    }
}
