package backend.spring.game.chapter;

import backend.spring.StringArrayToStringConverter;
import jakarta.persistence.Convert;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChapterDTO {

    private String image;
    private String content;
    private String identifier;

    private String[] pathA;

    private String[] pathB;

    private String[] pathC;
}
