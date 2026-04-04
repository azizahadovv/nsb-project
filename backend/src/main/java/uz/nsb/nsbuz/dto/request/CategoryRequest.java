package uz.nsb.nsbuz.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank private String name;
    private String iconUrl;
    private String description;
    private Long parentId;
    private Integer sortOrder;
}
