package backend.spring.game.chapter;

import backend.spring.game.Game;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    private String pathA;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String pathB;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String pathC;

    public Chapter () {}

}
