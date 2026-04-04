package uz.nsb.nsbuz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "blogs")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog extends BaseEntity {

    @NotBlank
    private String title;

    @Column(unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String imageUrl;
    private String author;
    private String seoTitle;

    @Column(columnDefinition = "TEXT")
    private String seoDescription;

    @Builder.Default
    private Boolean published = true;
}
