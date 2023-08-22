module.exports.formatPermalink = (reference, currentCategory) => {
    let permalink = ''
  
    const { relationTo, value } = reference
  
    if (typeof value === 'object' && value !== null) {
      const { slug } = value
  
      if (reference.relationTo === "pages") {
        const value = reference.value
        const breadcrumbs = value?.breadcrumbs
        const hasBreadcrumbs =
          breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0
        if (hasBreadcrumbs) {
          return breadcrumbs?.[breadcrumbs.length - 1]?.url
        }
      }
  
      if (reference.relationTo === "pageSettings") {
        const value = reference.value
        return `/${value.slug}`
      }
  
      if (reference.relationTo === "teams") {
        return `/rosters/${reference.value.teamsnapId}`
      }
  
      return `/${reference.relationTo}/${reference.value.slug}`  
   
    }
  
    return permalink
  }