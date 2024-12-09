import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { XMLBuilder } from "fast-xml-parser";
import { getAllService } from "../api/service-api";
import { getAllComplexes } from "../api/complex-api";
import { getAllEmployees } from "../api/employee-api";

const __filename = fileURLToPath(import.meta.url);

const baseUrl = "https://www.oramedcentr.com.ua";

async function generateSitemap() {
  const { data: servicesData } = await getAllService();
  const { data: complexData } = await getAllComplexes();
  const { data: employeeData } = await getAllEmployees();

  const pages = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/complex", changefreq: "weekly", priority: 1.0 },
    { url: "/price", changefreq: "weekly", priority: 1.0 },

    ...(servicesData || []).map((service) => ({
      url: `/service/${service._id}`,
      changefreq: "weekly",
      priority: 0.9,
    })),
    ...(complexData || []).map((complex) => ({
      url: `/complex/${complex._id}`,
      changefreq: "weekly",
      priority: 0.9,
    })),
    ...(employeeData || []).map((employee) => ({
      url: `/employee/${employee._id}`,
      changefreq: "weekly",
      priority: 0.9,
    })),
  ];

  const sitemap = {
    "?xml": { "@_version": "1.0", "@_encoding": "UTF-8" },
    urlset: {
      "@_xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      url: pages.map((page) => ({
        loc: `${baseUrl}${page.url}`,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString(),
      })),
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
  });
  const xmlContent = builder.build(sitemap);

  fs.writeFileSync(
    path.join(process.cwd(), "public", "sitemap.xml"),
    xmlContent,
  );
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch(console.error);
