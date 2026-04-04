package uz.nsb.nsbuz.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.nsb.nsbuz.exception.ResourceNotFoundException;
import uz.nsb.nsbuz.mapper.ServiceMapper;
import uz.nsb.nsbuz.model.ServiceEntity;
import uz.nsb.nsbuz.repository.ServiceRepository;
import uz.nsb.nsbuz.util.SlugUtil;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository repo;
    private final ServiceMapper mapper;

    public List<ServiceEntity> getAll() {
        return repo.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public ServiceEntity create(ServiceEntity svc) {
        if (svc.getSlug() == null || svc.getSlug().isBlank()) {
            svc.setSlug(SlugUtil.toSlug(svc.getTitle()));
        }
        return repo.save(svc);
    }

    @Transactional
    public ServiceEntity update(Long id, ServiceEntity req) {
        ServiceEntity svc = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
        mapper.updateEntity(svc, req);
        return repo.save(svc);
    }

    @Transactional
    public void delete(Long id) { repo.deleteById(id); }
}
