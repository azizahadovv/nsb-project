package uz.nsb.nsbuz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.nsb.nsbuz.model.ServiceEntity;
import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    Optional<ServiceEntity> findByIdAndDeletedFalse(Long id);
    List<ServiceEntity> findByDeletedFalseOrderBySortOrderAsc();
}
