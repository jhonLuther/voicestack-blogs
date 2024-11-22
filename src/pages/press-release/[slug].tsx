import { GetStaticProps, GetStaticPaths } from 'next';
import { getClient } from '~/lib/sanity.client';
import { pressReleaseSlugsQuery, getCaseStudy, getPressRelease, getRelatedContents, getPressReleases, getTagRelatedContents, getHomeSettings, getTags } from '~/lib/sanity.queries';
import { PressRelease } from '~/interfaces/post';
import Wrapper from '~/layout/Wrapper';
import { readToken } from '~/lib/sanity.api';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import Layout from '~/components/Layout';
import SanityPortableText from '~/components/blockEditor/sanityBlockEditor';
import AuthorInfo from '~/components/commonSections/AuthorInfo';
import Section from '~/components/Section';
import SidebarTitle from '~/components/typography/SidebarTitle';
import ShareableLinks from '~/components/commonSections/ShareableLinks';
import Button from '~/components/commonSections/Button';
import {DocumentTextIcon} from '@sanity/icons'
import { CustomHead, generateMetaData } from '~/utils/customHead';
import { GlobalDataProvider } from '~/components/Context/GlobalDataContext';

interface Props {
  pressRelease: PressRelease;
  draftMode: boolean;
  token: string;
  relatedContents?: any;
  tags?: any;
  homeSettings?: any
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const slugs = await client.fetch(pressReleaseSlugsQuery);

  const paths = slugs?.map((slug: string) => {
    return { params: { slug } };
  }) || [];

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<Props> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined);
  const pressRelease = await getPressRelease(client, params.slug as string);
  const tagIds = pressRelease.tags?.map((tag: any) => tag?._id) || []
  const relatedContents = await getTagRelatedContents(client,params.slug as string, tagIds,pressRelease.contentType);
  const tags =  await getTags(client)
  const homeSettings = await getHomeSettings(client)


  if (!pressRelease) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      pressRelease,
      relatedContents,
      tags,
      homeSettings
    },
  };
}

const PressReleasePage = ({ pressRelease,relatedContents,tags,homeSettings, draftMode, token }: Props) => {
  
  return (
    <>
    {generateMetaData(pressRelease)}
    <CustomHead props={pressRelease} type="pressRelease"/>
    <GlobalDataProvider data={tags} featuredTags={homeSettings.featuredTags} >
      <Layout >
        <MainImageSection enableDate={true} post={pressRelease} />
        <Section className='justify-center !pt-24 !pb-12'>
          <Wrapper className={'flex-col'}>
              <div className="flex md:flex-row flex-col gap-6 md:gap-12 justify-between">
                <div className="md:mt-12 flex-1 flex md:flex-col flex-col-reverse md:w-2/3 w-full md:max-w-[710px]">
                <div className='post__content w-full '>
                  <SanityPortableText
                    content={pressRelease.body}
                    draftMode={draftMode}
                    token={token}
                  />
                </div>
              </div>
              {/* <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
                <div className='sticky top-12 flex flex-col gap-12'>
                  <Toc headings={pressRelease?.headings} title="Contents" />
                  {pressRelease?.author &&
                    <div className=''>
                      <AuthorInfo  author={pressRelease?.author} />
                    </div>
                  }
                </div>
              </div> */}
              <div className='flex flex-col gap-8 md:mt-12 bg-red relative md:w-1/3 md:max-w-[410px] w-full'>
                <div className='sticky top-24 flex flex-col gap-8'>
                  <>
                    {pressRelease.pressReleaseUrl && (
                      <>
                        <SidebarTitle className='border-b border-zinc-200 pb-3'>{`To Know More About`}</SidebarTitle>
                        <Button target="_blank" link={pressRelease.pressReleaseUrl} className='bg-zinc-900 gap-6 py-[14px] px-7 hover:bg-zinc-800 self-start'>
                          <DocumentTextIcon width={24} height={24} className='text-white'/>
                          <span className='text-base font-medium'>{`Read Original Article`}</span>
                        </Button>
                      </>
                    )}
                    {pressRelease?.author &&
                    <div className=''>
                      <AuthorInfo author={pressRelease?.author} />
                    </div>
                  }
                  </>
                  <ShareableLinks props={pressRelease?.title} />
                </div>
              </div>
            </div>
          </Wrapper>
        </Section>
        {relatedContents.length > 0 && (
          <RelatedFeaturesSection
            contentType={pressRelease?.contentType}
            allPosts={relatedContents}
          />
        )}
      </Layout>
      </GlobalDataProvider>
    </>
  );
};

export default PressReleasePage;
