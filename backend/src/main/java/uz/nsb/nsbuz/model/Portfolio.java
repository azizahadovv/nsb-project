package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portfolio")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio extends BaseEntity {

    private String title;
    private String category;
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;
    private String capacity;
    private Integer year;
}
