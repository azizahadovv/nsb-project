package uz.nsb.nsbuz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.nsb.nsbuz.model.Product;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlugAndDeletedFalse(String slug);
    Optional<Product> findByIdAndDeletedFalse(Long id);
    Page<Product> findByDeletedFalse(Pageable p);
    Page<Product> findByCategorySlugAndIsActiveTrueAndDeletedFalse(String slug, Pageable p);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.deleted = false ORDER BY p.salesCount DESC")
    Page<Product> findPopular(Pageable p);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.deleted = false AND p.oldPrice IS NOT NULL")
    Page<Product> findOnSale(Pageable p);

    @Query("SELECT p FROM Product p WHERE p.isActive = true AND p.deleted = false AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%',:q,'%')))")
    Page<Product> search(@Param("q") String query, Pageable p);

    long countByIsActiveTrueAndDeletedFalse();
}
