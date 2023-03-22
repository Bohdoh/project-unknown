package backend.spring.enduser;

import backend.spring.ConverterService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class EnduserController {

    private final ConverterService converterService;
    private final EnduserRepository enduserRepository;

    public EnduserController(ConverterService converterService, EnduserRepository enduserRepository) {
        this.converterService = converterService;
        this.enduserRepository = enduserRepository;
    }

    @GetMapping("api/users/{username}")
    public EnduserDTO readUser(@PathVariable String username){
        return converterService.enduserToEnduserDTO(Objects.requireNonNull(enduserRepository.findByUsername(username).orElse(null)));
    }

    @PostMapping("api/users/{username}/image")
    public void saveUserImage(@PathVariable String username,@RequestParam("file") MultipartFile imageFile) throws IOException {
        byte[] imageBytes = imageFile.getBytes();
        if(imageBytes.length > 0) {
            enduserRepository.findByUsername(username).get().setImage(imageBytes);
        }

    }



}
