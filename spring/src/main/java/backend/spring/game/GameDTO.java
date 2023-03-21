package backend.spring.game;

import backend.spring.category.Category;
import backend.spring.game.comment.CommentDTO;
import backend.spring.game.review.ReviewDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDTO {

    private Set<Category> categories;
    private String image;
    private Instant createdAt;
    private String subtitle;
    private String title;
    private String content;
    private Integer id;
    private List<CommentDTO> comments;
    private List<ReviewDTO> reviews;
    private String author;

    public GameDTO(Set<Category> categories, String image, Instant createdAt, String subtitle, String title, String content, Integer id,String author) {
        this.categories = categories;
        this.image = image;
        this.createdAt = createdAt;
        this.subtitle = subtitle;
        this.title = title;
        this.content = content;
        this.id = id;
        this.author = author;
    }
}
