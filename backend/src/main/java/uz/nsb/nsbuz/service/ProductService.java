package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.ProductRequest;
import uz.nsb.nsbuz.dto.response.ProductResponse;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.ProductMapper;
import uz.nsb.nsbuz.model.*;
import uz.nsb.nsbuz.repository.*;
import uz.nsb.nsbuz.util.SlugUtil;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;
    private final BrandRepository brandRepo;
    private final ProductMapper mapper;

    public Page<ProductResponse> getAll(int p, int sz, String sort) {
        return productRepo.findAll(pageable(p, sz, sort)).map(mapper::toResponse);
    }
    public ProductResponse getById(Long id) { return mapper.toResponse(findById(id)); }
    public ProductResponse getBySlug(String slug) {
        return mapper.toResponse(productRepo.findBySlug(slug)
            .orElseThrow(() -> new ResourceNotFoundException("Product", "slug", slug)));
    }
    public Page<ProductResponse> getByCategory(String s, int p, int sz, String sort) {
        return productRepo.findByCategorySlugAndIsActiveTrue(s, pageable(p, sz, sort)).map(mapper::toResponse);
    }
    public Page<ProductResponse> getPopular(int p, int sz) {
        return productRepo.findPopular(PageRequest.of(p, sz)).map(mapper::toResponse);
    }
    public Page<ProductResponse> getOnSale(int p, int sz) {
        return productRepo.findOnSale(PageRequest.of(p, sz)).map(mapper::toResponse);
    }
    public Page<ProductResponse> getNewest(int p, int sz) {
        return productRepo.findAll(PageRequest.of(p, sz, Sort.by("createdAt").descending())).map(mapper::toResponse);
    }
    public Page<ProductResponse> search(String q, int p, int sz) {
        return productRepo.search(q, PageRequest.of(p, sz)).map(mapper::toResponse);
    }

    @Transactional
    public ProductResponse create(ProductRequest req) {
        Category cat = categoryRepo.findById(req.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", req.getCategoryId()));
        Brand brand = req.getBrandId() != null
            ? brandRepo.findById(req.getBrandId()).orElse(null) : null;
        return mapper.toResponse(productRepo.save(mapper.toEntity(req, cat, brand)));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest req) {
        Product p = findById(id);
        p.setName(req.getName());
        p.setSlug(SlugUtil.toSlug(req.getName()));
        p.setPrice(req.getPrice());
        p.setOldPrice(req.getOldPrice());
        p.setInstallmentPrice(req.getInstallmentPrice());
        p.setImageUrl(req.getImageUrl());
        p.setBadge(req.getBadge());
        p.setDescription(req.getDescription());
        p.setSeoTitle(req.getSeoTitle());
        p.setSeoDescription(req.getSeoDescription());
        if (req.getStock() != null) p.setStock(req.getStock());
        if (req.getIsSolar() != null) p.setIsSolar(req.getIsSolar());
        if (req.getCategoryId() != null) p.setCategory(categoryRepo.findById(req.getCategoryId()).orElse(p.getCategory()));
        if (req.getBrandId() != null) p.setBrand(brandRepo.findById(req.getBrandId()).orElse(null));
        return mapper.toResponse(productRepo.save(p));
    }

    @Transactional
    public void delete(Long id) { productRepo.delete(findById(id)); }

    private Product findById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }
    private Pageable pageable(int page, int size, String sort) {
        Sort s = switch (sort != null ? sort : "popular") {
            case "price_asc" -> Sort.by("price").ascending();
            case "price_desc" -> Sort.by("price").descending();
            case "newest" -> Sort.by("createdAt").descending();
            case "rating" -> Sort.by("rating").descending();
            default -> Sort.by("salesCount").descending();
        };
        return PageRequest.of(page, size, s);
    }
}
