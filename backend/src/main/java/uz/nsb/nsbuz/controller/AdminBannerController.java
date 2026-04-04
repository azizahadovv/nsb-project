package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.dto.request.BannerRequest;
import uz.nsb.nsbuz.model.Banner;
import uz.nsb.nsbuz.service.BannerService;
import java.util.List;

@RestController
@RequestMapping("/api/admin/banners")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Banners")
public class AdminBannerController {

    private final BannerService bannerService;

    @GetMapping
    public ResponseEntity<List<Banner>> all() {
        return ResponseEntity.ok(bannerService.getAll());
    }

    @PostMapping
    public ResponseEntity<Banner> create(@RequestBody BannerRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bannerService.create(r));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Banner> update(@PathVariable Long id, @RequestBody BannerRequest r) {
        return ResponseEntity.ok(bannerService.update(id, r));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
