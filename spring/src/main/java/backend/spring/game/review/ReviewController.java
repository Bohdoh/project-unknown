package backend.spring.game.review;

import backend.spring.ConverterService;
import backend.spring.exeptions.ReviewDoesntExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ConverterService converterService;

    private final ReviewService reviewService;

    public ReviewController(ReviewRepository reviewRepository, ConverterService converterService, ReviewService reviewService){
        this.reviewRepository = reviewRepository;
        this.converterService = converterService;
        this.reviewService = reviewService;
    }

    @PostMapping("/api/review")
    public void saveReview(@RequestBody ReviewDTOReceived review) {
        reviewRepository.save(converterService.reviewDTOReceivedToReview(review));
    }
    @PostMapping("/api/reviews/delete")
    public void deleteReview(@RequestBody Integer id) {
        reviewRepository.delete(reviewRepository.getReferenceById(id));
    }

    @PatchMapping("/api/review/update/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable int reviewId,  @RequestBody Map<String, Object> updates ){
        try {
            return ResponseEntity.ok (reviewService.update (reviewId,updates));
        }catch (ReviewDoesntExistException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
