package backend.spring.game.comment;

import backend.spring.ConverterService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
