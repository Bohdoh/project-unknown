package backend.spring.game.comment;

import backend.spring.ConverterService;
import backend.spring.exeptions.CommentDoesntExistsException;
import backend.spring.exeptions.UserDoesntExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment update(int commentId, ContentDTO updates) throws CommentDoesntExistsException {
        return commentRepository.findById(commentId).map(comment -> {
            String content =  updates.getContent ();
            if (content != null) {
                comment.setContent(content);
            }
            return commentRepository.save(comment);
        }).orElseThrow(() -> new CommentDoesntExistsException("Comment doesn't exist"));
    }
}

