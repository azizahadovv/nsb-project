package uz.nsb.nsbuz.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data @Builder
public class DashboardStats {
    private long totalProducts;
    private long totalOrders;
    private long totalUsers;
    private long newOrders;
    private BigDecimal totalRevenue;
}
