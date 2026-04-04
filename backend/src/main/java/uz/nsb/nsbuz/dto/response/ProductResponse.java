package uz.nsb.nsbuz.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private Long categoryId;
    private String categoryName;
    private Long brandId;
    private String brandName;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal oldPrice;
    private BigDecimal installmentPrice;
    private BigDecimal rating;
    private Integer reviewCount;
    private Integer stock;
    private String badge;
    private String description;
    private String seoTitle;
    private String seoDescription;
    private Boolean isSolar;
    private LocalDateTime createdAt;
}
