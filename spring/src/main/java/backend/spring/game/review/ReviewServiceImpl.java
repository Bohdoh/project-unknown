package backend.spring.game.review;

import backend.spring.exeptions.ReviewDoesntExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    @Override
    public Review update(int reviewId, Map<String, Object> updates) throws ReviewDoesntExistException {
        return reviewRepository.findById(reviewId).map(review -> {
            String content = (String) updates.get("content");
            if (content != null) {
                review.setContent(content);
            }

            Double rating = (Double) updates.get("rating");
            if (rating != null) {
                review.setRating(rating);
            }

            return reviewRepository.save(review);
        }).orElseThrow(() -> new ReviewDoesntExistException("Review doesn't exist"));
    }

}
