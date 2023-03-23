package backend.spring.profile;


import backend.spring.enduser.Enduser;
import backend.spring.game.comment.CommentDTO;
import backend.spring.game.review.Review;
import backend.spring.game.review.ReviewDTO;
import backend.spring.security.DAO.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private Integer enduserId;
    private String username;
    private String email;
    private String image;
    private Role role;
    private String password;
    private List<ReviewDTO> reviews;
    private List<CommentDTO> comments;

    public ProfileDTO(Enduser enduser){
        this.enduserId = enduser.getEnduserId();
        this.username = enduser.getUsername();
        this.email = enduser.getEmail();
        this.image = enduser.getImage();
        this.role = enduser.getRole();
        this.password= enduser.getPassword();
        this.reviews = enduser.getReviews ().stream()
                .map(review -> new ReviewDTO (review))
                .collect(Collectors.toList());
        this.comments = enduser.getComments().stream()
                .map(comment -> new CommentDTO(comment))
                .collect(Collectors.toList());
    }
}
