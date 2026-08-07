const APP_NAME = "Quality Standards";
const APP_DESCRIPTION =
  "Engineering reference for limits and fits, threads, GD&T, calculators, and surface roughness.";

export default function manifest() {
  return {
    name: APP_NAME,
    short_name: "Quality Std",
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f4f6f9",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
