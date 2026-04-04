package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.request.CategoryRequest;
import uz.nsb.nsbuz.model.Category;
import uz.nsb.nsbuz.util.SlugUtil;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequest req) {
        return Category.builder()
                .name(req.getName())
                .slug(SlugUtil.toSlug(req.getName()))
                .iconUrl(req.getIconUrl())
                .description(req.getDescription())
                .sortOrder(req.getSortOrder() != null ? req.getSortOrder() : 0)
                .build();
    }

    public void updateEntity(Category cat, CategoryRequest req) {
        cat.setName(req.getName());
        cat.setSlug(SlugUtil.toSlug(req.getName()));
        cat.setIconUrl(req.getIconUrl());
        cat.setDescription(req.getDescription());
        if (req.getSortOrder() != null) cat.setSortOrder(req.getSortOrder());
    }
}
