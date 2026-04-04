package uz.nsb.nsbuz.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    @NotBlank private String customerName;
    @NotBlank private String customerPhone;
    private String customerEmail;
    private String deliveryAddress;
    private String notes;
    @NotEmpty private List<OrderItemRequest> items;
}
