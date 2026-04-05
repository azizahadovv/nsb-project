package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.PortfolioMapper;
import uz.nsb.nsbuz.model.Portfolio;
import uz.nsb.nsbuz.repository.PortfolioRepository;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository repo;
    private final PortfolioMapper mapper;

    public Page<Portfolio> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return repo.findByDeletedFalse(pageable);
    }

    @Transactional
    public Portfolio create(Portfolio p) { return repo.save(p); }

    @Transactional
    public Portfolio update(Long id, Portfolio req) {
        Portfolio p = repo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id));
        mapper.updateEntity(p, req);
        return repo.save(p);
    }

    @Transactional
    public void delete(Long id) { 
        Portfolio p = repo.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio", "id", id));
        p.setDeleted(true);
        repo.save(p);
    }
}
