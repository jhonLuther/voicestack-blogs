export const fetchAuthor = (post) => {
    let authorData:any = [];
    post && post.authorInfo && (
        post.authorInfo.content.body.filter((block: any) => block.component === "authorBioSection")
      .map((author: any) => (authorData = author.author))
    )
    return authorData;
  }