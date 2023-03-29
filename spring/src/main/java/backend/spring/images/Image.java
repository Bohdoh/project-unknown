package backend.spring.images;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Base64;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    private String title;

    public Image(byte[] image,String title){
        this.image = image;
        this.title = title;
    }

    public String getImage(){
        return Base64.getEncoder().encodeToString(image);
    }


}
