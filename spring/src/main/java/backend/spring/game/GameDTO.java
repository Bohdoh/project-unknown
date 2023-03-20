package backend.spring.game;

import backend.spring.category.Category;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
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


}
