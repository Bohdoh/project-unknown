package backend.spring.enduser;

import backend.spring.ConverterService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EnduserController {

    private final ConverterService converterService;
    private final EnduserRepository enduserRepository;

    public EnduserController(ConverterService converterService, EnduserRepository enduserRepository) {
        this.converterService = converterService;
        this.enduserRepository = enduserRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/api/users/{username}")
    public EnduserDTO readUser(@PathVariable String username){
        return converterService.enduserToEnduserDTO(
                enduserRepository.findByUsername(username)
                        .orElseThrow(
                                () -> new IllegalArgumentException("Invalid username: " + username)));

    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping("/api/users/{username}/image")
    public void saveUserImage(@PathVariable String username,@RequestParam("file") MultipartFile imageFile) throws IOException {
        byte[] imageBytes = imageFile.getBytes();
        if(imageBytes.length > 0) {
            Optional<Enduser> optionalEnduser = enduserRepository.findByUsername(username);
            if (optionalEnduser.isPresent()) {
                optionalEnduser.get().setImage(imageBytes);
            } else {
                // Handle the case where the user is not found
                throw new IllegalArgumentException("User not found: " + username);
            }
        }
    }




}
