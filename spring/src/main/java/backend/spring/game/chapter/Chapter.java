package backend.spring.game.chapter;

import backend.spring.StringArrayToStringConverter;
import backend.spring.game.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

@Getter
@Setter
@Entity
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chapterId;

    @ManyToOne
    @JoinColumn(name = "gameId", nullable = false)
    private Game game;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;
    private String identifier; // "A-A-B" or something like that
    @Lob
    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringArrayToStringConverter.class)
    private String[] pathA;
    @Lob
    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringArrayToStringConverter.class)
    private String[] pathB;
    @Lob
    @Column(columnDefinition = "TEXT")
    @Convert(converter = StringArrayToStringConverter.class)
    private String[] pathC;

    public Chapter () {}

    public Chapter(Game game, byte[] image, String content, String identifier, String[] pathA, String[] pathB, String[] pathC) {
        this.game = game;
        this.image = image;
        this.content = content;
        this.identifier = identifier;
        this.pathA = pathA;
        this.pathB = pathB;
        this.pathC = pathC;
    }

    public String getImage(){
        return Base64.getEncoder().encodeToString(image);
    }

}
