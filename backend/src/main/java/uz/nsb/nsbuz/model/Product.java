package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data @EqualsAndHashCode(callSuper = true)
@NoArgsConstructor @AllArgsConstructor @Builder
public class Product extends BaseEntity {
    @NotBlank @Size(max = 200)
    private String name;
    @Column(unique = true)
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String imageUrl;
    @Column(precision = 15, scale = 2)
    private BigDecimal price;
    @Column(precision = 15, scale = 2)
    private BigDecimal oldPrice;
    @Column(precision = 15, scale = 2)
    private BigDecimal installmentPrice;
    @Builder.Default private BigDecimal rating = BigDecimal.ZERO;
    @Builder.Default private Integer reviewCount = 0;
    @Builder.Default private Integer stock = 0;
    private String badge;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String seoTitle;
    @Column(columnDefinition = "TEXT")
    private String seoDescription;
    @Builder.Default private Boolean isSolar = false;
    @Builder.Default private Boolean isActive = true;
    @Builder.Default private Long salesCount = 0L;
}
