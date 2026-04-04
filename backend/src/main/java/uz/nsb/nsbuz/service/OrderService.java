package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.*;
import uz.nsb.nsbuz.dto.response.OrderResponse;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.OrderMapper;
import uz.nsb.nsbuz.model.*;
import uz.nsb.nsbuz.repository.*;
import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;
    private final OrderMapper mapper;

    @Transactional
    public OrderResponse create(OrderRequest req, String userEmail) {
        Order order = Order.builder()
                .customerName(req.getCustomerName())
                .customerPhone(req.getCustomerPhone())
                .customerEmail(req.getCustomerEmail())
                .deliveryAddress(req.getDeliveryAddress())
                .notes(req.getNotes())
                .items(new ArrayList<>()).build();

        // Link to authenticated user if available
        if (userEmail != null) {
            userRepo.findByEmail(userEmail).ifPresent(order::setUser);
            if (order.getCustomerEmail() == null) {
                order.setCustomerEmail(userEmail);
            }
        }

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemRequest ir : req.getItems()) {
            Product p = productRepo.findById(ir.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "id", ir.getProductId()));
            BigDecimal sub = p.getPrice().multiply(BigDecimal.valueOf(ir.getQuantity()));
            order.getItems().add(OrderItem.builder()
                    .order(order).product(p).quantity(ir.getQuantity())
                    .unitPrice(p.getPrice()).totalPrice(sub).build());
            total = total.add(sub);
        }
        order.setTotalAmount(total);
        return mapper.toResponse(orderRepo.save(order));
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> getAll(int page, int size) {
        return orderRepo.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(mapper::toResponse);
    }

    @Transactional(readOnly = true)
    public OrderResponse getById(Long id) {
        return mapper.toResponse(orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id)));
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> getByEmail(String email, int page, int size) {
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) return Page.empty();
        return orderRepo.findByUserId(user.getId(),
                PageRequest.of(page, size, Sort.by("createdAt").descending()))
                .map(mapper::toResponse);
    }

    @Transactional
    public OrderResponse updateStatus(Long id, String status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
        order.setStatus(Order.Status.valueOf(status));
        return mapper.toResponse(orderRepo.save(order));
    }
}
