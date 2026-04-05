package uz.nsb.nsbuz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.Brand;
import java.util.List;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    Optional<Brand> findByIdAndDeletedFalse(Long id);
    List<Brand> findByDeletedFalseOrderBySortOrderAsc();
}
