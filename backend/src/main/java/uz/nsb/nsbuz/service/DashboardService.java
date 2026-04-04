package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.nsb.nsbuz.dto.response.DashboardStats;
import uz.nsb.nsbuz.model.Order;
import uz.nsb.nsbuz.repository.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final UserRepository userRepo;

    public DashboardStats getStats() {
        return DashboardStats.builder()
                .totalProducts(productRepo.countByIsActiveTrue())
                .totalOrders(orderRepo.count())
                .totalUsers(userRepo.count())
                .newOrders(orderRepo.countByStatus(Order.Status.NEW))
                .totalRevenue(orderRepo.calculateTotalRevenue())
                .build();
    }
}
