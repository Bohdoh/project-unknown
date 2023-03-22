package backend.spring.game.review;

import backend.spring.game.Game;
import backend.spring.game.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findAllByGame(Game game);

}
