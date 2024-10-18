const siteConfig = {
    pagination: {
      itemsPerPage: 6, // in main page
      childItemsPerPage:3 , // decides Content per page in child pages
      currentPage: 1,
      totalItems: 100
    },
     pageURLs : {
      home: "/",
      blog: "/blog",
      article: "/article",
      caseStudy: "/case-study",
      ebook: "/ebook",
      about: "/about",
      podcast: "/podcast",
      pressRelease: "/press-release",
      testimonial: "/testimonial",
      webinar: "/webinar",
    },
    content: {
      defaultSort: "date",
      showFeatured: true
    }
  };
  
  export default siteConfig;