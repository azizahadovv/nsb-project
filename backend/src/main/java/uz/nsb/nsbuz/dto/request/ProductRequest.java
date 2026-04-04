package uz.nsb.nsbuz.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank private String name;
    @NotNull private Long categoryId;
    private Long brandId;
    @NotNull private BigDecimal price;
    private BigDecimal oldPrice;
    private BigDecimal installmentPrice;
    private String imageUrl;
    private String badge;
    private String description;
    private String seoTitle;
    private String seoDescription;
    private Boolean isSolar;
    private Integer stock;
}
