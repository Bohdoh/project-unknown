package backend.spring.game;

import backend.spring.ConverterService;
import backend.spring.enduser.EnduserRepository;
import backend.spring.game.chapter.ChapterDTO;
import backend.spring.game.review.Review;
import backend.spring.game.comment.Comment;
import backend.spring.game.comment.CommentDTO;
import backend.spring.game.review.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class GameController {
    private final GameRepository gameRepository;
    private final EnduserRepository enduserRepository;
    private final ConverterService converterService;

    @Autowired
    private GameController(GameRepository gameRepository, EnduserRepository enduserRepository, ConverterService converterService) {
        this.gameRepository = gameRepository;
        this.enduserRepository = enduserRepository;
        this.converterService = converterService;
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/api/games")
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
                            game.getGameId(),
                            game.getEnduser().getUsername(),
                            converterService.reviewsToReviewDTOList(game.getReviews()))
            );
        }
        return response;
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/api/games/{id}")
    public GameDTO readGameDetails(@PathVariable Integer id) {

        Game game = gameRepository.findByGameId(id);
        List<CommentDTO> commentsDTO = new ArrayList<>();
        List<ReviewDTO> reviewsDTO = new ArrayList<>();

        for (Comment comment : game.getComments()) {
            commentsDTO.add(converterService.commentToCommentDTO(comment));
        }

        for (Review review : game.getReviews()) {
            reviewsDTO.add(converterService.reviewToReviewDTO(review));
        }

        return new GameDTO(
                game.getCategories(),
                game.getImage(),
                game.getCreatedAt(),
                game.getSubtitle(),
                game.getTitle(),
                game.getContent(),
                game.getGameId(),
                commentsDTO,
                reviewsDTO,
                game.getEnduser().getUsername()
        );
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/api/chapters/{gameId}")
    public List<ChapterDTO> readGameChapters(@PathVariable Integer gameId) {
        return converterService.chaptersToChapterDTOList(gameRepository.findByGameId(gameId).getChapters());
    }


}
