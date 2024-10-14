import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Post, Testimonial, Podcasts,Webinars, Ebooks } from '~/interfaces/post';
import { readToken } from '~/lib/sanity.api';
import { getClient } from '~/lib/sanity.client';
import { getEbooks, getPodcasts, getTags, getWebinars } from '~/lib/sanity.queries';
import { SharedPageProps } from '../_app';
import Wrapper from '~/layout/Wrapper';
import LatestBlogs from '~/components/sections/LatestBlogSection';
import Section from '~/components/Section';
import Layout from '~/components/Layout';
import TagSelect from '~/contentUtils/TagSelector';
import AllcontentSection from '~/components/sections/AllcontentSection';

export const getStaticProps: GetStaticProps<
  SharedPageProps & { ebooks: Ebooks[] }
> = async (context) => {
  const draftMode = context.preview || false;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const ebooks: any = await getEbooks(client, 5);
  const allEbooks: any = await getEbooks(client);
  const tags = await getTags(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      ebooks,
      allEbooks,
      tags,
    } as SharedPageProps & { ebooks: Ebooks[] },
  };
};

const EbooksPage = ({ ebooks, allEbooks, tags }: { ebooks: Ebooks[], allEbooks: Ebooks[], tags: any }) => {

  return (
    <Layout>
        <Wrapper>
        </Wrapper>
        <LatestBlogs className={'pt-11 pr-9 pb-16 pl-9'}  revamp={true} contents={ebooks} />
        <Wrapper>
          <AllcontentSection className={'pb-9'}  allContent={allEbooks} hideSearch={true} cardType={'podcast-card'}/>
        </Wrapper>
    </Layout>

  );
};

export default EbooksPage;

