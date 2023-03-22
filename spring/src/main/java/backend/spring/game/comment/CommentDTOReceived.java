package backend.spring.game.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTOReceived {
    private Integer gameId;
    private String username;
    private String content;
}
