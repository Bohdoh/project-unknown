package backend.spring.enduser;

import backend.spring.exeptions.UserDoesntExistException;
import backend.spring.exeptions.UserIsNotAdminException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    List<Enduser> getAllUsers(String username)throws UserDoesntExistException, UserIsNotAdminException;

}
