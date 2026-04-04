package uz.nsb.nsbuz.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.dto.response.UserResponse;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.UserMapper;
import uz.nsb.nsbuz.model.User;
import uz.nsb.nsbuz.repository.UserRepository;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin Users")
public class AdminUserController {

    private final UserRepository userRepo;
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(userRepo.findAll(PageRequest.of(page, size)).map(userMapper::toResponse));
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<UserResponse> block(@PathVariable Long id, @RequestParam boolean blocked) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setBlocked(blocked);
        return ResponseEntity.ok(userMapper.toResponse(userRepo.save(user)));
    }
}
