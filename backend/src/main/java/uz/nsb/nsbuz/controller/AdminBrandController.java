package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.model.Brand;
import uz.nsb.nsbuz.service.BrandService;
import java.util.List;

@RestController
@RequestMapping("/api/admin/brands")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Brands")
public class AdminBrandController {
    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> all() { return ResponseEntity.ok(brandService.getAll()); }

    @PostMapping
    public ResponseEntity<Brand> create(@RequestBody Brand b) {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.create(b));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> update(@PathVariable Long id, @RequestBody Brand b) {
        return ResponseEntity.ok(brandService.update(id, b));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        brandService.delete(id); return ResponseEntity.noContent().build();
    }
}
