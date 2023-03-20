package backend.spring.game.chapter;

import backend.spring.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChapterRepository extends JpaRepository<Chapter,Integer> {
}
