package backend.spring.game.comment;

import backend.spring.enduser.EnduserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Integer commentId;
    private Instant createdAt;
    private String content;
    private EnduserDTO enduser;
}
