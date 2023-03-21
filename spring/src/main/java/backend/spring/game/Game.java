package backend.spring.game;

import backend.spring.category.Category;
import backend.spring.enduser.Enduser;
import backend.spring.game.chapter.Chapter;
import backend.spring.game.comment.Comment;
import backend.spring.game.review.Review;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameId;


    @JsonManagedReference
    @OrderBy("name")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "gameHasCategory",
            joinColumns = @JoinColumn(name = "gameId"),
            inverseJoinColumns = @JoinColumn(name = "categoryId"))
    private Set<Category> categories;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "game")
    private List<Comment> comments;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "game")
    private List<Review> reviews;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "game")
    private List<Chapter> chapters;

    @ManyToOne
    @JoinColumn(name ="enduserId")
    private Enduser enduser;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    private Instant createdAt;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String subtitle;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    public Game() {
    }

    public Game(String title,String subtitle, String content) {
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.createdAt = Instant.now();
    }

    public Game( String title,String subtitle, String content, byte[] image,Enduser enduser) {

        this.image = image;
        this.createdAt = Instant.now();
        this.subtitle = subtitle;
        this.title = title;
        this.content = content;
        this.enduser = enduser;
    }


    public String getImage(){
        return Base64.getEncoder().encodeToString(image);
    }
}
