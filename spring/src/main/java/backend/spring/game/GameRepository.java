package backend.spring.game;

import backend.spring.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Integer> {
    Game findByGameId(Integer gameId);

    List<Game> findAllByOrderByCreatedAtDesc();

    Game findByTitle(String title);

}

