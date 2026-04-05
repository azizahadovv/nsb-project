package uz.nsb.nsbuz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Portfolio;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByIdAndDeletedFalse(Long id);
    Page<Portfolio> findByDeletedFalse(Pageable p);
    Page<Portfolio> findByCategoryAndDeletedFalse(String category, Pageable p);
}
