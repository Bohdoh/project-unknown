package backend.spring.enduser;

import backend.spring.exeptions.UserDoesntExistException;
import backend.spring.exeptions.UserIsNotAdminException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    List<EnduserDTO> getAllUsers(String username)throws UserDoesntExistException, UserIsNotAdminException;

    void upgrade(String username) throws UserDoesntExistException;

    void downgrade(String username) throws UserDoesntExistException;

}
