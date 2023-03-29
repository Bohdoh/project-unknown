package backend.spring;

import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserDTO;
import backend.spring.enduser.EnduserRepository;
import backend.spring.game.GameRepository;
import backend.spring.game.chapter.Chapter;
import backend.spring.game.chapter.ChapterDTO;
import backend.spring.game.comment.Comment;
import backend.spring.game.comment.CommentDTO;
import backend.spring.game.comment.CommentDTOReceived;
import backend.spring.game.review.Review;
import backend.spring.game.review.ReviewDTO;
import backend.spring.game.review.ReviewDTOReceived;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class ConverterService {
    private final EnduserRepository enduserRepository;
    private final GameRepository gameRepository;

    @Autowired
    public ConverterService(EnduserRepository enduserRepository, GameRepository gameRepository){
        this.enduserRepository = enduserRepository;
        this.gameRepository = gameRepository;
    }

    public EnduserDTO enduserToEnduserDTO(Enduser enduser){
        return new EnduserDTO(enduser.getUsername(), enduser.getImage(), enduser.getRole ());
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

    public Comment commentDTOReceivedToComment(CommentDTOReceived comment) {
        Enduser user = enduserRepository.findByUsername(comment.getUsername()).orElseThrow();
        return new Comment(comment.getContent(),user,gameRepository.findByGameId(comment.getGameId()),comment.getCommentId());
    }
    public Review reviewDTOReceivedToReview(ReviewDTOReceived review) {
        Enduser user = enduserRepository.findByUsername(review.getUsername()).orElseThrow();
        return new Review(review.getContent(),user,gameRepository.findByGameId(review.getGameId()),review.getRating(),review.getReviewId());
    }

    public List<ReviewDTO> reviewsToReviewDTOList(List<Review> reviews) {
        ArrayList<ReviewDTO> temp = new ArrayList<>();
        for(Review review : reviews){
            temp.add(new ReviewDTO(review.getReviewId(),review.getContent(),enduserToEnduserDTO(review.getEnduser()),review.getRating(),review.getCreatedAt()));
        }
        return temp;
    }

    public Comment commentDTOReceivedToCommentDelete(CommentDTOReceived comment) {
        Enduser user = enduserRepository.findByUsername(comment.getUsername()).orElseThrow();
        return new Comment(comment.getContent(),user,gameRepository.findByGameId(comment.getGameId()),comment.getCommentId());
    }
}
