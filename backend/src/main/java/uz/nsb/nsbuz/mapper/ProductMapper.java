package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.request.ProductRequest;
import uz.nsb.nsbuz.dto.response.ProductResponse;
import uz.nsb.nsbuz.model.*;
import uz.nsb.nsbuz.util.SlugUtil;

@Component
public class ProductMapper {
    public ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
            .id(p.getId()).name(p.getName()).slug(p.getSlug())
            .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
            .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
            .brandId(p.getBrand() != null ? p.getBrand().getId() : null)
            .brandName(p.getBrand() != null ? p.getBrand().getName() : null)
            .imageUrl(p.getImageUrl()).price(p.getPrice())
            .oldPrice(p.getOldPrice()).installmentPrice(p.getInstallmentPrice())
            .rating(p.getRating()).reviewCount(p.getReviewCount())
            .stock(p.getStock()).badge(p.getBadge())
            .description(p.getDescription())
            .seoTitle(p.getSeoTitle()).seoDescription(p.getSeoDescription())
            .isSolar(p.getIsSolar()).createdAt(p.getCreatedAt())
            .build();
    }

    public Product toEntity(ProductRequest req, Category cat, Brand brand) {
        return Product.builder()
            .name(req.getName()).slug(SlugUtil.toSlug(req.getName()))
            .category(cat).brand(brand).imageUrl(req.getImageUrl())
            .price(req.getPrice()).oldPrice(req.getOldPrice())
            .installmentPrice(req.getInstallmentPrice())
            .badge(req.getBadge()).description(req.getDescription())
            .seoTitle(req.getSeoTitle()).seoDescription(req.getSeoDescription())
            .isSolar(req.getIsSolar() != null && req.getIsSolar())
            .stock(req.getStock() != null ? req.getStock() : 0)
            .build();
    }
}
