package backend.spring.enduser;

import backend.spring.game.comment.Comment;
import backend.spring.game.Game;
import backend.spring.game.review.Review;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;
import java.util.List;

@Entity
@Getter
@Setter
public class Enduser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer enduserId;

    @Column(unique = true)
    private String username;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @OneToMany(mappedBy = "enduser",
            cascade = CascadeType.PERSIST)
    private List<Comment> comments;

    @OneToMany(mappedBy = "enduser",
            cascade = CascadeType.PERSIST)
    private List<Review> reviews;
    @OneToMany(mappedBy = "enduser",
            cascade = CascadeType.PERSIST)
    private List<Game> games;

    private String password;

    private String email;

    public Enduser(){}
    public Enduser(String username){
        this.username = username;

    }
    public Enduser(String username,List<Review> reviews,List<Comment> comments){
        this.username = username;
        this.reviews = reviews;
        this.comments =comments;
    }
    public String getImage(){
        return Base64.getEncoder().encodeToString(image);
    }
}
