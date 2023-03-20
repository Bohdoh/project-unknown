package backend.spring;

import backend.spring.category.Category;
import backend.spring.category.CategoryRepository;
import backend.spring.enduser.EnduserRepository;
import backend.spring.game.Game;
import backend.spring.enduser.Enduser;
import backend.spring.game.GameRepository;
import backend.spring.game.comment.Comment;
import backend.spring.game.comment.CommentRepository;
import backend.spring.game.review.ReviewRepository;
import com.github.javafaker.Faker;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class Application {
    private final GameRepository gameRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;
    private final EnduserRepository enduserRepository;
    private final ReviewRepository reviewRepository;
    private final Faker faker = new Faker();

    @Autowired
    public Application(GameRepository gameRepository, CategoryRepository categoryRepository, CommentRepository commentRepository,EnduserRepository enduserRepository, ReviewRepository reviewRepository) {
        this.gameRepository = gameRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
        this.enduserRepository = enduserRepository;
        this.reviewRepository = reviewRepository;
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
             categoryRepository.save(new Category("Empty"));


             Game game2 = gameRepository.findByGameId(1);
             Set<Category> catsForGame2 = new HashSet<>();
             catsForGame2.add(categoryRepository.findByName("Tech"));
             catsForGame2.add(categoryRepository.findByName("Science"));
             catsForGame2.add(categoryRepository.findByName("Horror"));
             catsForGame2.add(categoryRepository.findByName("Mystery"));
             game2.setCategories(catsForGame2);
            gameRepository.save(game2);
        }
        for (int i = 0; i < 6; i++) {
            Enduser user = new Enduser();
            user.setUsername(faker.name().username());
            user.setEmail(faker.internet().emailAddress());
            enduserRepository.save(user);
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
