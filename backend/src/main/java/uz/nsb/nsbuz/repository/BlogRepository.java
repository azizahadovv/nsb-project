package uz.nsb.nsbuz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Blog;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findBySlugAndDeletedFalse(String slug);
    Optional<Blog> findByIdAndDeletedFalse(Long id);
    Page<Blog> findByDeletedFalse(Pageable p);
    Page<Blog> findByPublishedTrueAndDeletedFalseOrderByCreatedAtDesc(Pageable p);
}
