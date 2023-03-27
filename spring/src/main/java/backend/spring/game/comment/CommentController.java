package backend.spring.game.comment;

import backend.spring.ConverterService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CommentController {

    private final CommentRepository commentRepository;
    private final ConverterService converterService;

    public CommentController(CommentRepository commentRepository,ConverterService converterService){
        this.commentRepository = commentRepository;
        this.converterService = converterService;
    }

    @PostMapping("/api/comment")
    public void saveComment(@RequestBody CommentDTOReceived comment) {
        commentRepository.save(converterService.commentDTOReceivedToComment(comment));
    }

    @PutMapping("/api/comments/update")
    public void updateComment(@RequestBody CommentDTOReceived comment) {
        commentRepository.save(converterService.commentDTOReceivedToComment(comment));
    }

    @PostMapping("/api/comments/delete")
    public void deleteComment(@RequestBody Integer id) {
        commentRepository.delete(commentRepository.getReferenceById(id));
    }
}
