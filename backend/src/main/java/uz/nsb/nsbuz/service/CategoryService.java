package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.CategoryRequest;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.CategoryMapper;
import uz.nsb.nsbuz.model.Category;
import uz.nsb.nsbuz.repository.CategoryRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repo;
    private final CategoryMapper mapper;

    public List<Category> getAll() {
        return repo.findAll();
    }

    public List<Category> getRoots() {
        return repo.findByParentIsNullOrderBySortOrderAsc();
    }

    @Transactional
    public Category create(CategoryRequest req) {
        Category cat = mapper.toEntity(req);
        if (req.getParentId() != null) {
            cat.setParent(repo.findById(req.getParentId()).orElse(null));
        }
        return repo.save(cat);
    }

    @Transactional
    public Category update(Long id, CategoryRequest req) {
        Category cat = findById(id);
        mapper.updateEntity(cat, req);
        if (req.getParentId() != null) {
            cat.setParent(repo.findById(req.getParentId()).orElse(null));
        }
        return repo.save(cat);
    }

    @Transactional
    public void delete(Long id) { repo.deleteById(id); }

    private Category findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }
}
