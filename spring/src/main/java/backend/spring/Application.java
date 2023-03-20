package backend.spring;

import backend.spring.category.Category;
import backend.spring.category.CategoryRepository;
import backend.spring.enduser.EnduserRepository;
import backend.spring.game.Game;
import backend.spring.enduser.Enduser;
import backend.spring.game.GameRepository;
import backend.spring.game.chapter.Chapter;
import backend.spring.game.chapter.ChapterRepository;
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
import java.time.Instant;
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
    private final ChapterRepository chapterRepository;
    private final ReviewRepository reviewRepository;
    private final Faker faker = new Faker();

    @Autowired
    public Application(ChapterRepository chapterRepository,GameRepository gameRepository, CategoryRepository categoryRepository, CommentRepository commentRepository,EnduserRepository enduserRepository, ReviewRepository reviewRepository) {
        this.gameRepository = gameRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
        this.enduserRepository = enduserRepository;
        this.reviewRepository = reviewRepository;
        this.chapterRepository = chapterRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @PostConstruct
    @Transactional
    public void dummyData() {

        create6DummyUsers();
        create6DummyGames();
        create5DummyCatsAndAssignThem();

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+"chapterimages"+File.separator+"theartifacthunt"+File.separator+ "indytitle.jpg"),
                "Indiana Jones is hired by a wealthy collector to find a rare artifact: the Eye of Osiris, a jewel rumored to grant its owner immense power. Indy travels to Egypt, where he must navigate ancient tombs, evade traps, and outsmart rival treasure hunters. But when he finally locates the Eye, he triggers a deadly curse that threatens to consume him. What should Indy do next? ",
                "",new String[] {"Leave the Eye and look for a way out.", "Death by a falling Rock","gameover"},
                new String[] {"Pick up the Eye:", "He picks up the eye and nothing happens","B-"},
                new String[] {"Ignore the eye and go deeper into the tomb:", "Indy steps into a trap that gets him smashed by falling Rocks and he eventually gets killed","gameover"}));

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                        readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+"chapterimages"+File.separator+"theartifacthunt"+File.separator+ "amazon.jpg"),
                        "With the Eye of Osiris in hand, Indy heads to the Amazon rainforest to uncover the secrets of an ancient civilization. He battles deadly snakes, fights off fierce tribes, and braves treacherous rivers. But when he discovers the truth behind the civilization's downfall, he is forced to confront a powerful entity that has lain dormant for centuries. ",
                        "B-",new String[] {"Shoot at the entity with the gun.", "The entity becomes angry and kills Indy in a storm of fire.","gameover"},
                new String[] {"Talk to the entity", "The entity remains silent and its eyes start to glow. Indy freezes to solid rock and is lost forever.","gameover"},
                new String[] {"Hand the eye of Osiris to the entity", "The entity becomes calm and starts to talk. It tells Indiana that the Eye is useless without the power of the lost citys spring. It gives him a hint where to find the source of power and Indy can continue his journey. ","B-C-"}
                        ));

        commentRepository.save(new Comment("Super spiel, hat mir gut gefallen!",enduserRepository.getById(1),gameRepository.findByGameId(1)));
    }

    private void create5DummyCatsAndAssignThem() {
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
    }

    private void create6DummyGames() {
        if (gameRepository.count() == 0) {

            gameRepository.save(new Game("Das ist ein Titel!","Das ist Subtitle!", "Das ist Content!",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image1.jpeg"),enduserRepository.findByEnduserId(1)));
            gameRepository.save(new Game("Das ist ein Titel!2","Das ist Subtitle!2", "Das ist Content!2",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image2.jpeg"),enduserRepository.findByEnduserId(2)));
            gameRepository.save(new Game("Das ist ein Titel!3","Das ist Subtitle!3", "Das ist Content!3",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image3.jpeg"),enduserRepository.findByEnduserId(3)));
            gameRepository.save(new Game("Das ist ein Titel!4","Das ist Subtitle!4", "Das ist Content!4",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image4.jpeg"),enduserRepository.findByEnduserId(4)));
            gameRepository.save(new Game("Das ist ein Titel!5","Das ist Subtitle!5", "Das ist Content!5",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image5.jpeg"),enduserRepository.findByEnduserId(5)));
            gameRepository.save(new Game("Das ist ein Titel!6","Das ist Subtitle!6", "Das ist Content!6",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image6.jpeg"),enduserRepository.findByEnduserId(1)));
            gameRepository.save(new Game("The Artifact Hunt","An Amazing Adventure where you can be Indiana Jones!", "Indiana Jones is hired by a wealthy collector to find a rare artifact: the Eye of Osiris, a jewel rumored to grant its owner immense power. Indy travels to Egypt, where he must navigate ancient tombs, evade traps, and outsmart rival treasure hunters. But when he finally locates the Eye, he triggers a deadly curse that threatens to consume him.",readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+"chapterimages"+File.separator+"theartifacthunt"+File.separator+ "indytitle.jpg"),enduserRepository.findByEnduserId(1)));

        }
    }

    private void create6DummyUsers() {
        for (int i = 0; i < 6; i++) {
            Enduser user = new Enduser();
            user.setUsername(faker.name().username());
            user.setEmail(faker.internet().emailAddress());
            user.setPassword(faker.phoneNumber().phoneNumber());
            user.setImage(readImage("spring"+File.separator+"src"+File.separator+"main"+File.separator+"resources" + File.separator + "static" +File.separator+ "images" +File.separator+ "image"+(i+1)+".jpeg"));
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
