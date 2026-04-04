package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.response.UserResponse;
import uz.nsb.nsbuz.model.User;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .blocked(user.getBlocked())
                .build();
    }
}
