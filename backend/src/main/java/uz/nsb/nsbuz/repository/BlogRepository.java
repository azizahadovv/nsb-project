package uz.nsb.nsbuz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Blog;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Optional<Blog> findBySlug(String slug);
    Page<Blog> findByPublishedTrueOrderByCreatedAtDesc(Pageable p);
}
