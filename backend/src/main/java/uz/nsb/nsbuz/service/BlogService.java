package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.BlogRequest;
import uz.nsb.nsbuz.dto.response.BlogResponse;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.BlogMapper;
import uz.nsb.nsbuz.model.Blog;
import uz.nsb.nsbuz.repository.BlogRepository;
import uz.nsb.nsbuz.util.SlugUtil;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepo;
    private final BlogMapper mapper;

    public Page<BlogResponse> getPublished(int page, int size) {
        return blogRepo.findByPublishedTrueAndDeletedFalseOrderByCreatedAtDesc(PageRequest.of(page, size))
                .map(mapper::toResponse);
    }

    public BlogResponse getBySlug(String slug) {
        return mapper.toResponse(blogRepo.findBySlugAndDeletedFalse(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", "slug", slug)));
    }

    @Transactional
    public BlogResponse create(BlogRequest req) {
        return mapper.toResponse(blogRepo.save(mapper.toEntity(req)));
    }

    @Transactional
    public BlogResponse update(Long id, BlogRequest req) {
        Blog blog = blogRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", "id", id));
        blog.setTitle(req.getTitle());
        blog.setSlug(SlugUtil.toSlug(req.getTitle()));
        blog.setShortDescription(req.getShortDescription());
        blog.setContent(req.getContent());
        blog.setImageUrl(req.getImageUrl());
        blog.setAuthor(req.getAuthor());
        blog.setSeoTitle(req.getSeoTitle());
        blog.setSeoDescription(req.getSeoDescription());
        if (req.getPublished() != null) blog.setPublished(req.getPublished());
        return mapper.toResponse(blogRepo.save(blog));
    }

    @Transactional
    public void delete(Long id) { 
        Blog blog = blogRepo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", "id", id));
        blog.setDeleted(true);
        blogRepo.save(blog);
    }

    public Page<BlogResponse> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return blogRepo.findByDeletedFalse(pageable).map(mapper::toResponse);
    }
}
