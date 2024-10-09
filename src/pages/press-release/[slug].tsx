// pages/testimonial/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { getClient } from '~/lib/sanity.client';
import { pressReleaseSlugsQuery, getCaseStudy, getPressRelease, getRelatedContents } from '~/lib/sanity.queries';
import { CaseStudies, PressRelease } from '~/interfaces/post';
import Wrapper from '~/components/commonSections/Wrapper';
import Image from 'next/image';
import { readToken } from '~/lib/sanity.api';
import { draftMode } from 'next/headers';
import SanityPortableText from '~/components/Editor/sanityBlockEditor';
import MainImageSection from '~/components/MainImageSection';
import RelatedFeaturesSection from '~/components/RelatedFeaturesSection';
import Container from '~/components/Container';
import AsideBannerBlock from '~/components/sections/asideBannerBlock';
import PracticeProfile from '~/contentUtils/PracticeProfile';

interface Props {
  pressRelease: PressRelease;
  draftMode: boolean;
  token: string;
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
    },
  };
}

const PressReleasePage = ({ pressRelease, draftMode, token }: Props) => {
  const router = useRouter();

  console.log(pressRelease, 'pressRelease data ');

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container >
      <MainImageSection post={pressRelease} />
      <Wrapper>
        <div className="flex  md:flex-row flex-col">
          <div className="mt-12 flex md:flex-col flex-col-reverse md:w-2/3 w-full ">
            <div className='post__content w-full '>
              <SanityPortableText
                content={pressRelease.body}
                draftMode={draftMode}
                token={token}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-12 mt-12  bg-red relative md:w-1/3 w-full'>
            <div className='sticky top-12 flex flex-col gap-12'>
              {pressRelease?.relatedPressReleases.length > 0 && <RelatedFeaturesSection title={pressRelease?.title} allPosts={pressRelease?.relatedPressReleases} />}
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default PressReleasePage;
