package backend.spring.game.comment;


import backend.spring.enduser.Enduser;
import backend.spring.exeptions.CommentDoesntExistsException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface CommentService {


        Comment update(int commentId, ContentDTO updates) throws CommentDoesntExistsException;

}
