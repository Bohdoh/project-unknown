package backend.spring.game.comment;


import backend.spring.enduser.Enduser;
import backend.spring.exeptions.CommentDoesntExistsException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface CommentService {

    public Comment update(int commentId, Map<String, Object> updates)throws CommentDoesntExistsException;
}
