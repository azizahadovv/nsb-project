package uz.nsb.nsbuz.mapper;

import org.springframework.stereotype.Component;
import uz.nsb.nsbuz.dto.request.BannerRequest;
import uz.nsb.nsbuz.model.Banner;

@Component
public class BannerMapper {

    public Banner toEntity(BannerRequest req) {
        return Banner.builder()
                .title(req.getTitle()).subtitle(req.getSubtitle())
                .imageUrl(req.getImageUrl()).linkUrl(req.getLinkUrl())
                .buttonText(req.getButtonText())
                .sortOrder(req.getSortOrder() != null ? req.getSortOrder() : 0)
                .isActive(req.getIsActive() != null ? req.getIsActive() : true)
                .build();
    }

    public void updateEntity(Banner b, BannerRequest req) {
        b.setTitle(req.getTitle());
        b.setSubtitle(req.getSubtitle());
        b.setImageUrl(req.getImageUrl());
        b.setLinkUrl(req.getLinkUrl());
        b.setButtonText(req.getButtonText());
        if (req.getSortOrder() != null) b.setSortOrder(req.getSortOrder());
        if (req.getIsActive() != null) b.setIsActive(req.getIsActive());
    }
}
