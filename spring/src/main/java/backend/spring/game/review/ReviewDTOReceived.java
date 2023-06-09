package backend.spring.game.review;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDTOReceived {
    private Integer gameId;
    private String username;
    private String content;
    private double rating;
    private Integer reviewId;
}
