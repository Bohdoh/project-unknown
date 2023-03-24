package backend.spring.enduser;

import backend.spring.ConverterService;
import backend.spring.exeptions.UserDoesntExistException;
import backend.spring.exeptions.UserIsNotAdminException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EnduserController {

    private final AdminService adminService;

    private final ConverterService converterService;
    private final EnduserRepository enduserRepository;

    public EnduserController(AdminService adminService, ConverterService converterService, EnduserRepository enduserRepository) {
        this.adminService = adminService;
        this.converterService = converterService;
        this.enduserRepository = enduserRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/api/users/{username}")
    public EnduserDTO readUser(@PathVariable String username) {
        return converterService.enduserToEnduserDTO(
                enduserRepository.findByUsername(username)
                        .orElseThrow(
                                () -> new IllegalArgumentException("Username not found in Repo: " + username)));

    }

    @CrossOrigin
    @PostMapping("/api/users/{username}/image")
    public ResponseEntity<?> saveUserImage(@PathVariable String username, @RequestParam("file") MultipartFile imageFile) {
        try {
            byte[] imageBytes = imageFile.getBytes();

            if (imageBytes.length > 0) {
                Optional<Enduser> optionalEnduser = enduserRepository.findByUsername(username);
                if (optionalEnduser.isPresent()) {
                    Enduser tempUser = optionalEnduser.orElse(null);
                    tempUser.setImage(imageBytes);
                    enduserRepository.save(tempUser);
                } else {
                    // Handle the case where the user is not found
                    throw new IllegalArgumentException("User not found: " + username);
                }
            }
            return ResponseEntity.ok().body(Map.of("message", "File uploaded successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message", "File uploaded successfully"));
        }
    }

    @CrossOrigin
    @GetMapping("/api/users/{username}/listOfUsers")
    public ResponseEntity<?> getUsers(@PathVariable String username){
        try {
            List<EnduserDTO> enduserDTOs = adminService.getAllUsers(username);
            return ResponseEntity.ok(enduserDTOs);
        } catch (UserIsNotAdminException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (UserDoesntExistException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @CrossOrigin
    @PutMapping("/api/upgrade/{username}")
    public void upgrade(@PathVariable String username) throws UserDoesntExistException {

      adminService.upgrade (username);
    }

    @CrossOrigin
    @PutMapping("/api/downgrade/{username}")
    public void downgrade(@PathVariable String username) throws UserDoesntExistException {

        adminService.downgrade (username);
    }


}




