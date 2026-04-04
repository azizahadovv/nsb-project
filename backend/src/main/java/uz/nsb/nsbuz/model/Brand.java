package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "brands")
@Data @EqualsAndHashCode(callSuper = true)
@NoArgsConstructor @AllArgsConstructor @Builder
public class Brand extends BaseEntity {
    @NotBlank @Size(max = 100)
    private String name;
    @Column(unique = true)
    private String slug;
    private String logoUrl;
    @Builder.Default
    private Integer sortOrder = 0;
}
