package backend.spring.enduser;

import backend.spring.exeptions.UserDoesntExistException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface EnduserService {

    public Enduser update(String username, Map<String, Object> updates) throws UserDoesntExistException;

}
