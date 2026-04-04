package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceEntity extends BaseEntity {

    private String title;
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String iconUrl;

    @Builder.Default
    private Integer sortOrder = 0;
}
