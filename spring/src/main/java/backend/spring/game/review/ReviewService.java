package backend.spring.game.review;

import backend.spring.exeptions.CommentDoesntExistsException;
import backend.spring.exeptions.ReviewDoesntExistException;
import backend.spring.game.comment.Comment;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface ReviewService {
    public Review update(int reviewId, Map<String, Object> updates)throws ReviewDoesntExistException;
}
