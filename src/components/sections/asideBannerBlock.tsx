import Link from 'next/link';
import React from 'react';
import H3Medium from '../typography/H3Medium';
import DescriptionText from '../typography/DescriptionText';
import Wrapper from '~/layout/Wrapper';
import Section from '../Section';

interface AsidebannerBlockProps {
  contents?:any

}

const AsideBannerBlock: React.FC<AsidebannerBlockProps> = ({ contents }) => {

  return (
    <Section className=' pb-9 justify-center bg-zinc-800'>
      <Wrapper>
      {contents && contents?.asideBookFreeDemoBanner?.map((item, i) => {
        return (
          <div className='flex flex-col gap-4 border-l-4 px-6 border-zinc-700 ' key={item._id || i}>
            <H3Medium className='text-white '>{item.number}</H3Medium>
            <DescriptionText className={`text-zinc-300 pb-4 text-sm font-normal leading-relaxed tracking-wide border-zi-50 ${i === contents.asideBookFreeDemoBanner.length - 1 ? 'border-b-0' : ''}`}>{item.text}</DescriptionText>
          </div>
        )
      })}
      </Wrapper>
    </Section>
  );
};

export default AsideBannerBlock;
