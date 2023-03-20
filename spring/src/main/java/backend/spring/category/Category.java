package backend.spring.category;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import backend.spring.game.Game;
import lombok.Getter;
import lombok.Setter;


import java.util.Set;

@Entity
@Table(name = "category", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    @JsonBackReference
    @ManyToMany(mappedBy = "categories")
    private Set<Game> games;

    private String name;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

}


