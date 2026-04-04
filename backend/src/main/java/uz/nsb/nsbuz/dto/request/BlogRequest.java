package uz.nsb.nsbuz.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlogRequest {
    @NotBlank private String title;
    private String shortDescription;
    private String content;
    private String imageUrl;
    private String author;
    private String seoTitle;
    private String seoDescription;
    private Boolean published;
}
