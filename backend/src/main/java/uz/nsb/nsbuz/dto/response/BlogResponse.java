package uz.nsb.nsbuz.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data @Builder
public class BlogResponse {
    private Long id;
    private String title;
    private String slug;
    private String shortDescription;
    private String content;
    private String imageUrl;
    private String author;
    private String seoTitle;
    private String seoDescription;
    private Boolean published;
    private LocalDateTime createdAt;
}
