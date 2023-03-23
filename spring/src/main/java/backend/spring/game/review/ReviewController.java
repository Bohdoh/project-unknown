package backend.spring.game.review;

import backend.spring.ConverterService;
import backend.spring.game.comment.CommentDTOReceived;
import backend.spring.game.comment.CommentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ConverterService converterService;

    public ReviewController(ReviewRepository reviewRepository,ConverterService converterService){
        this.reviewRepository = reviewRepository;
        this.converterService = converterService;
    }

    @PostMapping("/api/review")
    public void saveReview(@RequestBody ReviewDTOReceived review) {
        reviewRepository.save(converterService.reviewDTOReceivedToReview(review));
    }
    @PostMapping("/api/reviews/delete")
    public void deleteReview(@RequestBody Integer id) {
        reviewRepository.delete(reviewRepository.getReferenceById(id));
    }


}
