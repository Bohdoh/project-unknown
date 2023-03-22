package backend.spring;

import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserDTO;
import backend.spring.game.chapter.Chapter;
import backend.spring.game.chapter.ChapterDTO;
import backend.spring.game.comment.Comment;
import backend.spring.game.comment.CommentDTO;
import backend.spring.game.review.Review;
import backend.spring.game.review.ReviewDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConverterService {

    public EnduserDTO enduserToEnduserDTO(Enduser enduser){
        return new EnduserDTO(enduser.getUsername(), enduser.getImage());
    }

    public CommentDTO commentToCommentDTO(Comment comment){
        return new CommentDTO(comment.getCommentId(),comment.getCreatedAt(),comment.getContent(),enduserToEnduserDTO(comment.getEnduser ()));
    }

    public ReviewDTO reviewToReviewDTO(Review review){
        return new ReviewDTO(review.getReviewId(),review.getContent(),enduserToEnduserDTO(review.getEnduser()),review.getRating(),review.getCreatedAt());
    }

    public List<ChapterDTO> chaptersToChapterDTOList(List<Chapter> chapters){
        ArrayList<ChapterDTO> temp = new ArrayList<>();
        for(Chapter chapter : chapters){
            temp.add(new ChapterDTO(chapter.getImage(),chapter.getContent(),chapter.getIdentifier(),chapter.getPathA(),chapter.getPathB(),chapter.getPathC()));
        }
        return temp;
    }
}
