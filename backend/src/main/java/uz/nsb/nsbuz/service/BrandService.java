package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.model.Brand;
import uz.nsb.nsbuz.repository.BrandRepository;
import uz.nsb.nsbuz.util.SlugUtil;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository repo;

    public List<Brand> getAll() { return repo.findByDeletedFalseOrderBySortOrderAsc(); }

    @Transactional
    public Brand create(Brand b) {
        b.setSlug(SlugUtil.toSlug(b.getName()));
        return repo.save(b);
    }

    @Transactional
    public Brand update(Long id, Brand req) {
        Brand b = repo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", "id", id));
        b.setName(req.getName());
        b.setSlug(SlugUtil.toSlug(req.getName()));
        b.setLogoUrl(req.getLogoUrl());
        if (req.getSortOrder() != null) b.setSortOrder(req.getSortOrder());
        return repo.save(b);
    }

    @Transactional
    public void delete(Long id) { 
        Brand b = repo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", "id", id));
        b.setDeleted(true);
        repo.save(b);
    }
}
