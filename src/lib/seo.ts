const BASE_URL = "https://siviajes.onrender.com"
const SITE_NAME = "SI VIAJES"

interface PackageMeta {
  name: string
  description: string
  image?: string
  price?: number
}

export function packageMetaTags(pkg: PackageMeta) {
  return {
    title: `${pkg.name} — ${SITE_NAME}`,
    description: pkg.description,
    ogTitle: `${pkg.name} — ${SITE_NAME}`,
    ogDescription: pkg.description,
    ogImage: pkg.image ?? "/logo.jpeg",
    ogUrl: `${BASE_URL}/package/${encodeURIComponent(pkg.name.toLowerCase().replace(/\s+/g, "-"))}`,
  }
}

export function pageMetaTags(title: string, description: string, path: string) {
  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    ogTitle: `${title} — ${SITE_NAME}`,
    ogDescription: description,
    ogUrl: `${BASE_URL}${path}`,
  }
}

export function applyMetaTags(tags: Record<string, string>) {
  const setMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
    if (!el) {
      el = document.createElement("meta")
      if (name.startsWith("og:")) {
        el.setAttribute("property", name)
      } else {
        el.setAttribute("name", name)
      }
      document.head.appendChild(el)
    }
    el.setAttribute("content", content)
  }

  if (tags.title) document.title = tags.title
  if (tags.description) setMeta("description", tags.description)
  if (tags.ogTitle) setMeta("og:title", tags.ogTitle)
  if (tags.ogDescription) setMeta("og:description", tags.ogDescription)
  if (tags.ogImage) setMeta("og:image", tags.ogImage)
  if (tags.ogUrl) setMeta("og:url", tags.ogUrl)
}
