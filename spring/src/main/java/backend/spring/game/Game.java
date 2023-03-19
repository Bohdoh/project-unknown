package backend.spring.game;

import backend.spring.category.Category;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.springframework.data.repository.cdi.Eager;

import java.time.Instant;
import java.util.Base64;
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

    public Game( String title,String subtitle, String content, byte[] image) {

        this.image = image;
        this.createdAt = Instant.now();
        this.subtitle = subtitle;
        this.title = title;
        this.content = content;
    }


    public String getImage(){
        return Base64.getEncoder().encodeToString(image);
    }
}
