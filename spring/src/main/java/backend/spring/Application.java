package backend.spring;

import backend.spring.category.Category;
import backend.spring.category.CategoryRepository;
import backend.spring.enduser.Enduser;
import backend.spring.enduser.EnduserRepository;
import backend.spring.game.Game;
import backend.spring.game.GameRepository;
import backend.spring.game.chapter.Chapter;
import backend.spring.game.chapter.ChapterRepository;
import backend.spring.game.comment.Comment;
import backend.spring.game.comment.CommentRepository;
import backend.spring.game.review.Review;
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
import java.util.HashSet;
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
    public Application(ChapterRepository chapterRepository, GameRepository gameRepository, CategoryRepository categoryRepository, CommentRepository commentRepository, EnduserRepository enduserRepository, ReviewRepository reviewRepository) {
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

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"), readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "indytitle.jpg"),
                "Indiana Jones is hired by a wealthy collector to find a rare artifact: the Eye of Osiris, a jewel rumored to grant its owner immense power. Indy travels to Egypt, where he must navigate ancient tombs, evade traps, and outsmart rival treasure hunters. But when he finally locates the Eye, he triggers a deadly curse that threatens to consume him. What should Indy do next? ",
                "start", new String[]{"Leave the Eye and look for a way out.", "You try to search for a way out, triggering a trap. You fall down a pit and this was the last anyone ever heard of Indiana Jones.", "gameover"},
                new String[]{"Pick up the Eye.", "You pick up the Eye and expect some trap to trigger, but nothing bad happens!", "B-"},
                new String[]{"Ignore the eye and go deeper into the tomb.", "Indy steps into a trap that gets him smashed by falling Rocks and he eventually gets killed", "gameover"}));

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "amazon.jpg"),
                "With the Eye of Osiris in hand, Indy heads to the Amazon rainforest to uncover the secrets of an ancient civilization. He battles deadly snakes, fights off fierce tribes, and braves treacherous rivers. But when he discovers the truth behind the civilization's downfall, he is forced to confront a powerful entity that has lain dormant for centuries. ",
                "B-", new String[]{"Shoot at the entity with the gun.", "The entity becomes angry and kills Indy in a storm of fire.", "gameover"},
                new String[]{"Talk to the entity", "The entity remains silent and its eyes start to glow. Indy freezes to solid rock and is lost forever.", "gameover"},
                new String[]{"Hand the eye of Osiris to the entity", "The entity becomes calm and starts to talk. It tells Indiana that the Eye is useless without the power of the lost citys spring. It gives him a hint where to find the source of power and Indy can continue his journey. ", "B-C-"}
        ));

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "berlin.jpg"),
                "After a while of research Indiana had to travel to Berlin. He got a hint where to find the sources of the lost city. Indy's arch-nemesis, the Nazi archaeologist Dr. Hans Ubermann, has learned of the Eye of Osiris and will stop at nothing to acquire it. In a high-stakes showdown, Indy and Ubermann race through the streets of Berlin, fighting off Nazi soldiers and dodging machine-gun fire. But when they finally face off in a secret underground bunker, Indy is confronted with a deadly weapon that could change the course of the war. ",
                "B-C-", new String[]{"Destroy the weapon", "The weapon explodes with the power of 100 atomic bombs and everybody dies.", "gameover"},
                new String[]{"Steal the weapon and run", "Indy tries to steal the weapon but gets shot by the soldiers of Ubermann. The Nazis win the war and the world is doomed.", "gameover"},
                new String[]{"Surrender to Uberman", "Uberman tries to take Indiana to the prison. On the way there Indy can manage to get rid of his handcuffs, steal the weapon and escapes.", "B-C-C-"}
        ));

        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "lostcity.jpg"),
                "Indy receives a cryptic message from an old friend about a lost city deep in the Himalayan mountains. He sets out on a perilous journey through icy terrain, facing blizzards, avalanches, and deadly falls. But when he reaches the lost city, he discovers a dark secret that could destroy him. All of a sudden he can hear a noise in the distance behind him. ",
                "B-C-C-", new String[]{"Hide behind some rocks.", "A group of treasure hunters pass by. They spot Indiana and shoot him right away because they thought he was planning an ambush.", "gameover"},
                new String[]{"Wait for the noise to come closer and see what happens.", "Indy is captured by a group of ruthless treasure hunters who are also searching for the lost city. They torture him for information, but Indy manages to escape and foil their plans, ultimately emerging victorious. He manages to find the source of life in the Lost city and charges up the power of the Eye of Osiris.","B-C-C-B-"},
                new String[]{"Run away deeper into the city.", "Indy becomes obsessed with the dark secret he has discovered and refuses to leave the lost city. He becomes increasingly isolated and paranoid, eventually losing his sanity and becoming a danger to himself and others while disappearing forever in the Lost City.", "gameover"}
        ));
        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "cave.jpg"),
                "The Eye is still useless without a little detail. It needs to be brought to the place where it was forged. After a couple of months and more research, Indy is about to bring the artifact to a deep underwater cavern where he expects the forge. He dons scuba gear and plunges into the ocean depths, battling vicious sharks and dodging underwater mines. But when he finally reaches the cavern, he realizes he's not alone—and the creature that lurks there is more terrifying than anything he's faced before. ",
                "B-C-C-B-", new String[]{"Use the eye against the creature.", "Indy successfully defeats the creature that lurks in the underwater cavern and manages to retrieve the missing detail of the Eye. He makes it out of the cave but notices a group of people waiting for him while his coming back to the surface.", "B-C-C-B-A-"},
                new String[]{"Fight the creature with bare hands.", "Indy is unable to defeat the creature and becomes trapped in the underwater cavern. He gets wounded, runs out of oxygen and drowns, ultimately leading to his death.", "gameover"},
                new String[]{"Use the secret weapon against the monster", "Indy manages to fend off the creature and retrieve the missing detail of the Eye, but on his way back to the surface, he realizes that the weapon destroyed the way out. He becomes disoriented and lost in the underwater cavern forever.", "gameover"}
        ));
        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "showdown.jpg"),
                "In the climactic finale, Indy faces off against Ubermann and a shadowy cabal that seeks to use the Eye of Osiris to enslave the world. They engage in a deadly battle aboard a speeding train, dodging gunfire and sword strikes. But when Indy finally reaches the Eye, he's faced with a terrible choice: use its power to defeat his enemies, or destroy it and prevent anyone from ever harnessing its power again. ",
                "B-C-C-B-A-", new String[]{"Destroy the eye.", "Good Ending - Indy destroys the Eye of Osiris, preventing anyone from ever using its power again. With the Eye gone, the shadowy cabal's plans are foiled, and they are defeated. Indy emerges victorious, and he is hailed as a hero for saving the world from enslavement.", "won"},
                new String[]{"Use the power of the eye.", "Bad Ending - Indy uses the power of the Eye to defeat his enemies, but in doing so, he becomes corrupted by its power. He becomes a tyrant, using the Eye to control and manipulate those around him. Eventually, his power consumes him, and he dies a lonely, miserable death.", "gameover"},
                new String[]{"Hand over the eye to Ubermann.", "Bad Ending - Ubermann chooses to use the eye for his own plans, but by doing so, he sets off a catastrophic chain of events that leads to the deaths of many innocent people. The world becomes doomed by the power of Ubermann and the shadowy cabals. Everybody dies at the end.", "gameover"}
        ));
        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "gameover.jpg"),
                "You died.",
                "gameover", null, new String[]{"Restart", "You died.", "start"}, null
        ));
        chapterRepository.save(new Chapter(gameRepository.findByTitle("The Artifact Hunt"),
                readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "win.jpg"),
                "You made it!.",
                "won", null, new String[]{"Restart", "Do you want to restart?.", "start"}, null
        ));
        commentRepository.save(new Comment("Super spiel, hat mir gut gefallen!", enduserRepository.getById(1), gameRepository.findByGameId(1),0));
        commentRepository.save(new Comment("Was für ein Abenteuer! ", enduserRepository.getById(1), gameRepository.findByGameId(7),0));

        reviewRepository.save(new Review("Ich gebe dem spiel eine 5 von 5!", enduserRepository.getById(1), gameRepository.findByGameId(7) ,5, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(7) ,2, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(7) ,2, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(1) ,1, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(2) ,2, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(3) ,3, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(4) ,4, 0));
        reviewRepository.save(new Review("Hat mir nicht so spaß gemacht, liegt vllt an mir.", enduserRepository.getById(7), gameRepository.findByGameId(5) ,5, 0));
    }

    private void create5DummyCatsAndAssignThem() {
        if (categoryRepository.count() == 0) {
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

            gameRepository.save(new Game("Das ist ein Titel!", "Das ist Subtitle!", "Das ist Content!", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image1.jpeg"), enduserRepository.findByEnduserId(1)));
            gameRepository.save(new Game("Das ist ein Titel!2", "Das ist Subtitle!2", "Das ist Content!2", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image2.jpeg"), enduserRepository.findByEnduserId(2)));
            gameRepository.save(new Game("Das ist ein Titel!3", "Das ist Subtitle!3", "Das ist Content!3", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image3.jpeg"), enduserRepository.findByEnduserId(3)));
            gameRepository.save(new Game("Das ist ein Titel!4", "Das ist Subtitle!4", "Das ist Content!4", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image4.jpeg"), enduserRepository.findByEnduserId(4)));
            gameRepository.save(new Game("Das ist ein Titel!5", "Das ist Subtitle!5", "Das ist Content!5", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image5.jpeg"), enduserRepository.findByEnduserId(5)));
            gameRepository.save(new Game("Das ist ein Titel!6", "Das ist Subtitle!6", "Das ist Content!6", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image6.jpeg"), enduserRepository.findByEnduserId(1)));
            gameRepository.save(new Game("The Artifact Hunt", "An Amazing Adventure where you can be Indiana Jones!", "Indiana Jones is hired by a wealthy collector to find a rare artifact: the Eye of Osiris, a jewel rumored to grant its owner immense power. Indy travels to Egypt, where he must navigate ancient tombs, evade traps, and outsmart rival treasure hunters. But when he finally locates the Eye, he triggers a deadly curse that threatens to consume him.", readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "chapterimages" + File.separator + "theartifacthunt" + File.separator + "indytitle.jpg"), enduserRepository.findByEnduserId(1)));
        }
    }

    private void create6DummyUsers() {
        for (int i = 0; i < 6; i++) {
            Enduser user = new Enduser ();
            user.setUsername(faker.name().username());
            user.setEmail(faker.internet().emailAddress());
            user.setPassword(faker.phoneNumber().phoneNumber());
            user.setImage(readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "image" + (i + 1) + ".jpeg"));
            enduserRepository.save(user);
        }
        Enduser user = new Enduser ();
        user.setUsername(faker.name().username());
        user.setEmail("test");
        user.setPassword("test");
        user.setImage(readImage("spring" + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "images" + File.separator + "pepe-rain.gif"));
        enduserRepository.save(user);
    }

    public byte[] readImage(String path) {
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
