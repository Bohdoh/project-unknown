package backend.spring.game.comment;

import backend.spring.exeptions.CommentDoesntExistsException;
import backend.spring.exeptions.UserDoesntExistException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    @Override
    public Comment update(int commentId, Map<String, Object> updates) throws CommentDoesntExistsException {
        return commentRepository.findById(commentId).map(comment -> {
            String content = (String) updates.get("content");
            if (content != null) {
                comment.setContent(content);
            }
            return commentRepository.save(comment);
        }).orElseThrow(() -> new CommentDoesntExistsException("Comment doesn't exist"));
    }

    /*return commentRepository.findById (commentId).map (comment -> {
            updates.forEach ((key, value) -> {
                switch (key) {
                    case "content":
                        comment.setContent ((String) value);
                        break;

                }
            });
            return commentRepository.save (comment);
        }).orElseThrow (() -> new CommentDoesntExistsException ("Comment doesn't exist"));
    * */

}
