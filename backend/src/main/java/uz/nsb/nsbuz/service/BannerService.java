package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.dto.request.BannerRequest;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.BannerMapper;
import uz.nsb.nsbuz.model.Banner;
import uz.nsb.nsbuz.repository.BannerRepository;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BannerService {

    private final BannerRepository repo;
    private final BannerMapper mapper;

    public List<Banner> getAll() {
        return repo.findAll();
    }

    public List<Banner> getActive() {
        return repo.findByIsActiveTrueOrderBySortOrderAsc();
    }

    @Transactional
    public Banner create(BannerRequest req) {
        return repo.save(mapper.toEntity(req));
    }

    @Transactional
    public Banner update(Long id, BannerRequest req) {
        Banner b = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        mapper.updateEntity(b, req);
        return repo.save(b);
    }

    @Transactional
    public void delete(Long id) { repo.deleteById(id); }
}
