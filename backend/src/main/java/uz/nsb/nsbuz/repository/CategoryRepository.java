package uz.nsb.nsbuz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findBySlugAndDeletedFalse(String slug);
    Optional<Category> findByIdAndDeletedFalse(Long id);
    List<Category> findByDeletedFalseOrderBySortOrderAsc();
    List<Category> findByParentIsNullAndDeletedFalseOrderBySortOrderAsc();
}
