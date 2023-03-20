package backend.spring.game.review;

import backend.spring.enduser.EnduserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Integer id;
    private String content;
    private EnduserDTO enduserDTO;
    private double rating;
}
