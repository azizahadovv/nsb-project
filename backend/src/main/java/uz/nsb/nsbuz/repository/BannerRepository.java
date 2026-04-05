package uz.nsb.nsbuz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Banner;
import java.util.List;
import java.util.Optional;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    Optional<Banner> findByIdAndDeletedFalse(Long id);
    List<Banner> findByDeletedFalseOrderBySortOrderAsc();
    List<Banner> findByIsActiveTrueAndDeletedFalseOrderBySortOrderAsc();
}
