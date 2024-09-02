import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLiveQuery } from 'next-sanity/preview';
import Card from '~/components/Card';
import Container from '~/components/Container';
import Section from '~/components/Section';
import Welcome from '~/components/Welcome';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getPosts, postsQuery } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import { useRouter } from "next/router";
import TagSelect from '~/common/TagSelector';

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const posts = await getPosts(client);

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  };
};

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const router = useRouter();
  const mainSection = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>(props.posts);
  console.log(posts,'post');
  
  const tags = posts
  .flatMap((item) => item.tags || [])  
  .map((tag) => tag?.tagName)  
  .filter((name) => name !== undefined)  
  .filter((value, index, self) => self.indexOf(value) === index); 

  const contentTypes = posts
  .flatMap((item) => item.contentTypes || [])  
  .map((tag) => tag?.contentType)  
  .filter((name) => name !== undefined)  
  .filter((value, index, self) => self.indexOf(value) === index); 

  

  const filteredPosts = selectedTag
    ? posts.filter(post => 
        (post.contentTypes || []).some(tag => tag.contentType === selectedTag)
      )
    : posts;

  const filteredTags = selectedTag
    ? posts.filter(post => 
        (post.tags || []).some(tag => tag.tagName === selectedTag)
      )
    : posts;

    
  console.log(filteredPosts,'filteredPosts');

  const segmentSize = 3;
  const segments = [];
  for (let i = 0; i < filteredPosts.length; i += segmentSize) {
    segments.push(filteredPosts.slice(i, i + segmentSize));
  }

  const currentSegment = segments[currentPage - 1] || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    mainSection.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Section ref={mainSection} className="flex-col max-w-7xl py-20">
        <TagSelect contentTypes={contentTypes} onChange={handleTagChange} />

        {currentSegment.length ? (
          currentSegment.map((post: Post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )}

        <div className="flex justify-center mt-8">
          {segments.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === index + 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Section>
    </Container>
  );
}
