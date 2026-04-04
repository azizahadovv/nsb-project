package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.dto.request.*;
import uz.nsb.nsbuz.dto.response.BlogResponse;
import uz.nsb.nsbuz.model.*;
import uz.nsb.nsbuz.service.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Content")
public class AdminContentController {

    private final BlogService blogService;
    private final CategoryService categoryService;
    private final ServiceService serviceService;
    private final PortfolioService portfolioService;


    // Blog CRUD
    @GetMapping("/blogs")
    public ResponseEntity<Page<BlogResponse>> blogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(blogService.getAll(page, size));
    }

    @PostMapping("/blogs")
    public ResponseEntity<BlogResponse> createBlog(@Valid @RequestBody BlogRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.create(r));
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<BlogResponse> updateBlog(@PathVariable Long id, @Valid @RequestBody BlogRequest r) {
        return ResponseEntity.ok(blogService.update(id, r));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Category CRUD
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> adminCategories() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCat(@Valid @RequestBody CategoryRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(r));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCat(@PathVariable Long id, @Valid @RequestBody CategoryRequest r) {
        return ResponseEntity.ok(categoryService.update(id, r));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCat(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Service CRUD
    @PostMapping("/services")
    public ResponseEntity<ServiceEntity> createSvc(@RequestBody ServiceEntity s) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceService.create(s));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ServiceEntity> updateSvc(@PathVariable Long id, @RequestBody ServiceEntity s) {
        return ResponseEntity.ok(serviceService.update(id, s));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteSvc(@PathVariable Long id) {
        serviceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Portfolio CRUD
    @GetMapping("/portfolio")
    public ResponseEntity<Page<Portfolio>> portfolio(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(portfolioService.getAll(page, size));
    }

    @PostMapping("/portfolio")
    public ResponseEntity<Portfolio> createPort(@RequestBody Portfolio p) {
        return ResponseEntity.status(HttpStatus.CREATED).body(portfolioService.create(p));
    }

    @PutMapping("/portfolio/{id}")
    public ResponseEntity<Portfolio> updatePort(@PathVariable Long id, @RequestBody Portfolio p) {
        return ResponseEntity.ok(portfolioService.update(id, p));
    }

    @DeleteMapping("/portfolio/{id}")
    public ResponseEntity<Void> deletePort(@PathVariable Long id) {
        portfolioService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
