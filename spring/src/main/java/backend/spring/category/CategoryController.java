package backend.spring.category;

import backend.spring.game.Game;
import backend.spring.game.GameDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin
public class CategoryController {

    private final CategoryRepository categoryRepository;
    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("api/categories")
    public List<CategoryDTO> read() {
        List<CategoryDTO> response = new LinkedList<>();
        for (Category category : categoryRepository.findAllByOrderByNameAsc()) {
            response.add(
                    new CategoryDTO(
                            category.getCategoryId(),
                            category.getName()
                    )
            );
        }
        return response;
    }
}
