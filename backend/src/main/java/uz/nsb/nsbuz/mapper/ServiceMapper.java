package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.model.ServiceEntity;
import uz.nsb.nsbuz.util.SlugUtil;

@Component
public class ServiceMapper {

    public void updateEntity(ServiceEntity svc, ServiceEntity req) {
        svc.setTitle(req.getTitle());
        svc.setSlug(SlugUtil.toSlug(req.getTitle()));
        svc.setDescription(req.getDescription());
        svc.setIconUrl(req.getIconUrl());
        if (req.getSortOrder() != null) svc.setSortOrder(req.getSortOrder());
    }
}
