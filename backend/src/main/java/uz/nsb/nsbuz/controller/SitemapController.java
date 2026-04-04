package uz.nsb.nsbuz.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import uz.nsb.nsbuz.repository.*;

@RestController
@RequiredArgsConstructor
public class SitemapController {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;
    private final BlogRepository blogRepo;

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> sitemap() {
        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        addUrl(sb, "https://nsb.uz/", "1.0", "daily");
        addUrl(sb, "https://nsb.uz/catalog", "0.9", "daily");
        addUrl(sb, "https://nsb.uz/blog", "0.8", "weekly");
        addUrl(sb, "https://nsb.uz/about", "0.5", "monthly");
        addUrl(sb, "https://nsb.uz/contact", "0.5", "monthly");

        categoryRepo.findAll().forEach(c ->
            addUrl(sb, "https://nsb.uz/catalog/" + c.getSlug(), "0.8", "daily"));
        productRepo.findAll().forEach(p ->
            addUrl(sb, "https://nsb.uz/product/" + p.getSlug(), "0.7", "weekly"));
        blogRepo.findAll().forEach(b ->
            addUrl(sb, "https://nsb.uz/blog/" + b.getSlug(), "0.6", "weekly"));

        sb.append("</urlset>");
        return ResponseEntity.ok(sb.toString());
    }

    private void addUrl(StringBuilder sb, String loc, String priority, String freq) {
        sb.append("<url><loc>").append(loc).append("</loc>")
          .append("<priority>").append(priority).append("</priority>")
          .append("<changefreq>").append(freq).append("</changefreq></url>\n");
    }
}
