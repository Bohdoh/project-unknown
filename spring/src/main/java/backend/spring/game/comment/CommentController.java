package backend.spring.game.comment;

import backend.spring.ConverterService;
import backend.spring.exeptions.CommentDoesntExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class CommentController {

    private final CommentService commentService;
    private final CommentRepository commentRepository;
    private final ConverterService converterService;

    public CommentController(CommentService commentService, CommentRepository commentRepository, ConverterService converterService){
        this.commentService = commentService;
        this.commentRepository = commentRepository;
        this.converterService = converterService;
    }

    @PostMapping("/api/comment")
    public void saveComment(@RequestBody CommentDTOReceived comment) {
        commentRepository.save(converterService.commentDTOReceivedToComment(comment));
    }

   @PatchMapping("/api/comment/update/{commentId}")
   public ResponseEntity<?> updateCommentContent(@PathVariable int commentId, @RequestBody Map<String, Object> updates){
        try {
         return ResponseEntity.ok (commentService.update (commentId,updates));
        }catch (CommentDoesntExistsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
   }

    @PostMapping("/api/comments/delete")
    public void deleteComment(@RequestBody Integer id) {
        commentRepository.delete(commentRepository.getReferenceById(id));
    }
}
