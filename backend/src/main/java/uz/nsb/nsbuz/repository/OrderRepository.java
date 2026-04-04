package uz.nsb.nsbuz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.nsb.nsbuz.model.Order;
import java.math.BigDecimal;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByUserId(Long userId, Pageable p);
    long countByStatus(Order.Status status);

    @Query(value = "SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'CANCELLED'", nativeQuery = true)
    BigDecimal calculateTotalRevenue();
}
