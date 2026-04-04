package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.model.Portfolio;

@Component
public class PortfolioMapper {

    public void updateEntity(Portfolio p, Portfolio req) {
        p.setTitle(req.getTitle());
        p.setCategory(req.getCategory());
        p.setImageUrl(req.getImageUrl());
        p.setDescription(req.getDescription());
        p.setLocation(req.getLocation());
        p.setCapacity(req.getCapacity());
        p.setYear(req.getYear());
    }
}
