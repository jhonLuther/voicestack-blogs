const siteConfig = {
    pagination: {
      itemsPerPage: 12,
      itemsHomePage: 11,
      childItemsPerPage:8, 
      currentPage: 1,
      totalItems: 100
    },
     pageURLs : {
      home: "/",
      blog: "blog",
      article: "article",
      caseStudy: "case-study",
      ebook: "ebook",
      about: "about",
      podcast: "podcast",
      pressRelease: "press-release",
      testimonial: "testimonial",
      webinar: "webinar",
      author: "author",
    },
    paginationBaseUrls:{
      base:"browse"
    },
    externalLinks: {
      reviews:'https://carestack.com/dental-software/reviews'
    },
    content: {
      defaultSort: "date",
      showFeatured: true
    },
    placeHolder :{
      podcastCover: "https://cdn.sanity.io/images/bbmnn1wc/production/9cb0d15a2b39b73dcb35b588b6aef6e9c50742c2-2500x2000.jpg",
      podcastHeroCover:"https://cdn.sanity.io/images/bbmnn1wc/production/cfc2c520a6ab1da036ded9f234c066d7166d05ef-6000x4000.jpg"
    }
  };
  
  export default siteConfig;