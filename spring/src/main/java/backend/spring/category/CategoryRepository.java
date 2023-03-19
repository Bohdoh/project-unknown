package backend.spring.category;

import backend.spring.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    Set<Category> findAllByOrderByName();
    Set<Category> findAllByOrderByNameAsc();
}
