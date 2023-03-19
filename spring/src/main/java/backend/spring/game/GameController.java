package backend.spring.game;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
public class GameController {
    private final GameRepository gameRepository;

    @Autowired
    private GameController(GameRepository gameRepository){
        this.gameRepository = gameRepository;
    }

    @GetMapping("api/games")
    public List<GameDTO> read() {
        List<GameDTO> response = new LinkedList<>();
        for (Game game : gameRepository.findAllByOrderByCreatedAtDesc()) {
            response.add(
                    new GameDTO(
                            game.getCategories(),
                            game.getImage(),
                            game.getCreatedAt(),
                            game.getSubtitle(),
                            game.getTitle(),
                            game.getContent(),
                            game.getGameId()
                    )
            );
        }
        return response;
    }

}
