package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.request.BlogRequest;
import uz.nsb.nsbuz.dto.response.BlogResponse;
import uz.nsb.nsbuz.model.Blog;
import uz.nsb.nsbuz.util.SlugUtil;

@Component
public class BlogMapper {

    public BlogResponse toResponse(Blog b) {
        return BlogResponse.builder()
                .id(b.getId())
                .title(b.getTitle())
                .slug(b.getSlug())
                .shortDescription(b.getShortDescription())
                .content(b.getContent())
                .imageUrl(b.getImageUrl())
                .author(b.getAuthor())
                .seoTitle(b.getSeoTitle())
                .seoDescription(b.getSeoDescription())
                .published(b.getPublished())
                .createdAt(b.getCreatedAt())
                .build();
    }

    public Blog toEntity(BlogRequest req) {
        return Blog.builder()
                .title(req.getTitle())
                .slug(SlugUtil.toSlug(req.getTitle()))
                .shortDescription(req.getShortDescription())
                .content(req.getContent())
                .imageUrl(req.getImageUrl())
                .author(req.getAuthor())
                .seoTitle(req.getSeoTitle())
                .seoDescription(req.getSeoDescription())
                .published(req.getPublished() != null ? req.getPublished() : true)
                .build();
    }
}
