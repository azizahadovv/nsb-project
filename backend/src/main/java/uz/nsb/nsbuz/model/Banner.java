package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "banners")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Banner extends BaseEntity {

    private String title;

    @Column(columnDefinition = "TEXT")
    private String subtitle;

    private String imageUrl;
    private String linkUrl;
    private String buttonText;

    @Builder.Default
    private Integer sortOrder = 0;

    @Builder.Default
    private Boolean isActive = true;
}
