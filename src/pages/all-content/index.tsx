import { useRef, useState, useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '~/components/Container';
import Section from '~/components/Section';
import { readToken } from '~/lib/sanity.api';
import { getPosts,} from '~/lib/sanity.queries';
import type { SharedPageProps } from '~/pages/_app';
import { Post } from '~/interfaces/post';
import TagSelect from '~/contentUtils/TagSelector';
import { getClient } from '~/lib/sanity.client';
import Wrapper from '~/components/commonSections/Wrapper';
import AllcontentSection from '~/components/sections/AllcontentSection';



interface IndexPageProps {
    latestPosts: any;
    podcastData: any;
    draftMode: boolean;
    token: string;
    posts: Array<Post>;
    tags: Array<any>;
    testimonials: Array<any>;
    homeSettings: Array<any>;
}

export const getStaticProps: GetStaticProps<SharedPageProps & { posts: Post[] }> = async ({ draftMode = false }) => {
    const client = getClient(draftMode ? { token: readToken } : undefined);

    try {
        const posts = await getPosts(client);
        return {
            props: {
                draftMode,
                token: draftMode ? readToken : '',
                posts,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                draftMode,
                token: draftMode ? readToken : '',
                posts: [],
            },
        };
    }
};


export default function IndexPage(props: IndexPageProps) {
    const mainSection = useRef<HTMLDivElement>(null);

    return (
        <Container>
            <Section ref={mainSection} className="flex-col py-12 bg-cs-gray">
                <Wrapper>
                    <AllcontentSection allContent={props?.posts} hideSearch={true} />
                </Wrapper>
            </Section>
        </Container>
    );
}