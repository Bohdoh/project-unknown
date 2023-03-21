package backend.spring.game;

import backend.spring.enduser.Enduser;
import backend.spring.game.review.Review;
import backend.spring.enduser.EnduserDTO;
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

    @Autowired
    private GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
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
                            game.getEnduser ().getUsername()
                    )
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

        for(Comment comment : game.getComments()) {
            commentsDTO.add(commentToCommentDTO(comment));
        }

        for(Review review : game.getReviews()) {
            reviewsDTO.add(reviewToReviewDTO(review));
        }

        GameDTO response = new GameDTO(
                game.getCategories(),
                game.getImage(),
                game.getCreatedAt(),
                game.getSubtitle(),
                game.getTitle(),
                game.getContent(),
                game.getGameId(),
                commentsDTO,
                reviewsDTO,
                game.getEnduser ().getUsername()
        );
        return response;
    }

    public EnduserDTO enduserToEnduserDTO(Enduser enduser){
        return new EnduserDTO(enduser.getUsername(), enduser.getImage());
    }

    public CommentDTO commentToCommentDTO(Comment comment){
        return new CommentDTO(comment.getCommentId(),comment.getCreatedAt(),comment.getContent(),enduserToEnduserDTO(comment.getEnduser ()));
    }

    public ReviewDTO reviewToReviewDTO(Review review){
        return new ReviewDTO(review.getReviewId(),review.getContent(),enduserToEnduserDTO(review.getEnduser ()),review.getRating());
    }
}
