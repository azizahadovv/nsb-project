package uz.nsb.nsbuz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.NewsletterSubscriber;

public interface NewsletterRepository extends JpaRepository<NewsletterSubscriber, Long> {
    boolean existsByEmail(String email);
}
