package uz.nsb.nsbuz.dto.request;

import lombok.Data;

@Data
public class BannerRequest {
    private String title;
    private String subtitle;
    private String imageUrl;
    private String linkUrl;
    private String buttonText;
    private Integer sortOrder;
    private Boolean isActive;
}
