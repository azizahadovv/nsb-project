package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.response.OrderItemResponse;
import uz.nsb.nsbuz.dto.response.OrderResponse;
import uz.nsb.nsbuz.model.Order;

import java.util.List;

@Component
public class OrderMapper {

    public OrderResponse toResponse(Order o) {
        List<OrderItemResponse> items = o.getItems().stream()
                .map(i -> OrderItemResponse.builder()
                        .productId(i.getProduct().getId())
                        .productName(i.getProduct().getName())
                        .productImage(i.getProduct().getImageUrl())
                        .quantity(i.getQuantity())
                        .unitPrice(i.getUnitPrice())
                        .totalPrice(i.getTotalPrice())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(o.getId())
                .customerName(o.getCustomerName())
                .customerPhone(o.getCustomerPhone())
                .totalAmount(o.getTotalAmount())
                .status(o.getStatus().name())
                .items(items)
                .createdAt(o.getCreatedAt())
                .build();
    }
}
