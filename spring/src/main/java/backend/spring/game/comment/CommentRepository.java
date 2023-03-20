package backend.spring.game.comment;

import backend.spring.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment> findAllByGame(Game game);
}
