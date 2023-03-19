package backend.spring;

import backend.spring.category.Category;
import backend.spring.category.CategoryRepository;
import backend.spring.game.Game;
import backend.spring.game.GameRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

@SpringBootApplication
public class Application {
    private final GameRepository gameRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public Application(GameRepository gameRepository, CategoryRepository categoryRepository) {
        this.gameRepository = gameRepository;
        this.categoryRepository = categoryRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @PostConstruct
    @Transactional
    public void dummyData() {
        if (gameRepository.count() == 0) {

            gameRepository.save(new Game("Das ist ein Titel!","Das ist Subtitle!", "Das ist Content!",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image1.jpeg")));
            gameRepository.save(new Game("Das ist ein Titel!2","Das ist Subtitle!2", "Das ist Content!2",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image2.jpeg")));
            gameRepository.save(new Game("Das ist ein Titel!3","Das ist Subtitle!3", "Das ist Content!3",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image3.jpeg")));
            gameRepository.save(new Game("Das ist ein Titel!4","Das ist Subtitle!4", "Das ist Content!4",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image4.jpeg")));
            gameRepository.save(new Game("Das ist ein Titel!5","Das ist Subtitle!5", "Das ist Content!5",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image5.jpeg")));
            gameRepository.save(new Game("Das ist ein Titel!6","Das ist Subtitle!6", "Das ist Content!6",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image6.jpeg")));
        }
        if (categoryRepository.count() == 0){
             categoryRepository.save(new Category("Tech"));
             categoryRepository.save(new Category("Science"));
             categoryRepository.save(new Category("Horror"));
             categoryRepository.save(new Category("Mystery"));


             Game game2 = gameRepository.findByGameId(1);
             game2.setCategories(categoryRepository.findAllByOrderByName());
            gameRepository.save(game2);
        }
    }

    public byte[] readImage(String path){
        // Read the image data as a byte array
        String imagePath = path;
        File imageFile = new File(imagePath);
        byte[] imageData = new byte[(int) imageFile.length()];
        try (InputStream inputStream = new FileInputStream(imageFile)) {
            inputStream.read(imageData);
            return imageData;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
