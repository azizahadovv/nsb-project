package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.dto.request.OrderRequest;
import uz.nsb.nsbuz.dto.response.OrderResponse;
import uz.nsb.nsbuz.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(
            @Valid @RequestBody OrderRequest req,
            Authentication auth) {
        String email = (auth != null) ? auth.getName() : null;
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.create(req, email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping("/my")
    public ResponseEntity<Page<OrderResponse>> myOrders(
            Authentication auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        if (auth == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(orderService.getByEmail(auth.getName(), page, size));
    }
}
