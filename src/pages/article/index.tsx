import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts,Articles } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getArticles, getPodcasts, getTags } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/components/commonSections/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Container from '~/components/Container';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { articles: Articles[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const articles: any = await getArticles(client, 5);
  const allArticles: any = await getArticles(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      articles,
      allArticles,
      tags,
    } as SharedPageProps & { articles: Articles[] },
  };
};

const ArticlesPage = ({ articles, allArticles, tags }: { articles: Articles[], allArticles: Articles[], tags: any }) => {

  return (
    <Container>
        <Wrapper>
        </Wrapper>
        <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'}  revamp={true} contents={articles} />
        <Wrapper>
          <AllcontentSection className={'pb-9'}  allContent={allArticles} hideSearch={true} cardType={'podcast-card'}/>
        </Wrapper>
    </Container>

  );
};

export default ArticlesPage;

