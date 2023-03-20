package backend.spring.game.review;

import backend.spring.enduser.Enduser;
import backend.spring.game.Game;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name ="gameId",nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "enduserId",nullable = false)
    private Enduser enduser;

    private double rating;

    public Review (){}
}
