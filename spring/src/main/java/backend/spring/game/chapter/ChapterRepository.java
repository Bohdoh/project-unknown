package backend.spring.game.chapter;

import backend.spring.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter,Integer> {

    List<Chapter> findAllByGame(Game game);
}
