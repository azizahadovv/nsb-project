package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.exception.BadRequestException;
import uz.nsb.nsbuz.model.*;
import uz.nsb.nsbuz.repository.NewsletterRepository;
import uz.nsb.nsbuz.service.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Public")
public class PublicController {
    private final CategoryService categoryService;
    private final ServiceService serviceService;
    private final BannerService bannerService;
    private final BrandService brandService;
    private final NewsletterRepository newsletterRepo;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> categories() { return ResponseEntity.ok(categoryService.getAll()); }
    @GetMapping("/services")
    public ResponseEntity<List<ServiceEntity>> services() { return ResponseEntity.ok(serviceService.getAll()); }
    @GetMapping("/banners")
    public ResponseEntity<List<Banner>> banners() { return ResponseEntity.ok(bannerService.getActive()); }
    @GetMapping("/brands")
    public ResponseEntity<List<Brand>> brands() { return ResponseEntity.ok(brandService.getAll()); }

    @PostMapping("/newsletter")
    public ResponseEntity<Map<String, String>> subscribe(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) throw new BadRequestException("Email kiritilishi shart");
        if (newsletterRepo.existsByEmail(email)) throw new BadRequestException("Allaqachon obuna");
        newsletterRepo.save(NewsletterSubscriber.builder().email(email).build());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "OK"));
    }
}
