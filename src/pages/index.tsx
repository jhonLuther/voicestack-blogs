import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Card from '~/components/Card';
import Container from '~/components/Container';
import Section from '~/components/Section';
import { readToken } from '~/lib/sanity.api';
import { getPosts } from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import TagSelect from '~/common/TagSelector';
import { getClient } from '~/lib/sanity.client';
import Wrapper from '~/components/commonSections/Wrapper';

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[];
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

export default function IndexPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const mainSection = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedContentType, setSelectedContentType] = useState<string>('');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(props.posts);

  useEffect(() => {
    let filtered = props.posts;

    if (selectedContentType) {
      filtered = filtered.filter(post => post.contentType === selectedContentType);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(tag => post.tags?.some(t => t.tagName === tag))
      );
    }

    if (selectedTimeFilter) {
      const now = new Date();
      filtered = filtered.filter(post => {
        const createdAt = new Date(post._createdAt);
        switch (selectedTimeFilter) {
          case 'day':
            return now.getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000;
          case 'week':
            return now.getTime() - createdAt.getTime() < 7 * 24 * 60 * 60 * 1000;
          case 'month':
            return now.getTime() - createdAt.getTime() < 30 * 24 * 60 * 60 * 1000;
          case 'year':
            return now.getTime() - createdAt.getTime() < 365 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      });
    }

    if (filtered.length === 0) {
      console.log('No matching posts found');
    }

    setFilteredPosts(filtered);
  }, [selectedTags, selectedContentType, selectedTimeFilter, props.posts]);

  const tags = props.posts
    .flatMap(post => post.tags || [])
    .map(tag => tag?.tagName)
    .filter((name, index, self) => name && self.indexOf(name) === index);

    console.log(props.posts,'props post ');
    

  const contentTypes = props.posts
    .map(type => type?.contentType)
    .filter((name, index, self) => name && self.indexOf(name) === index);

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
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag) 
        : [...prevTags, tag] 
    );
    setCurrentPage(1);
  };

  const handleContentTypeChange = (contentType: string) => {
    setSelectedContentType(contentType);
    setCurrentPage(1);
  };

  const handleTimeFilterChange = (filter: string) => {
    setSelectedTimeFilter(filter);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Wrapper color={"white"} spacing={"pt-0"}>
        <Section ref={mainSection} className="flex-col py-20">
          <TagSelect
            contentTypes={contentTypes}
            tags={tags}
            onContentTypeChange={handleContentTypeChange}
            onTagChange={handleTagChange}
            onTimeFilterChange={handleTimeFilterChange}
            selectedTags={selectedTags}
            tagLimit={4}
          />

          <div className='grid grid-cols-3 gap-1'>
            {currentSegment.length > 0 ? (
              currentSegment.map(post => <Card key={post._id} post={post} />)
            ) : (
              <div className="text-center py-10">
                <p>No matching posts found.</p>
              </div>
            )}
          </div>

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
      </Wrapper>
    </Container>
  );
}