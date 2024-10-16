import React from 'react';
import Image from 'next/image';
import { urlForImage } from '~/lib/sanity.image';
import Breadcrumb from '../commonSections/BreadCrumb';

const EbookCard = ({ ebook }) => {
	return (
		<div className="max-w-2xl bg-white rounded-l-lg rounded-r-3xl overflow-hidden shadow-lg">
			<div className='overflow-hidden'>
				{(ebook?.mainImage || ebook?.image) && (
					<Image
						className="w-auto  block min-h-[400px] object-center object-cover group-hover: scale-100 transition duration-500 "
						src={urlForImage(ebook.mainImage || ebook.image).width(700).height(350).url()}
						height={350}
						width={700}
						alt={ebook.title || 'Blog Image'}
					/>
				)}
			</div>
			<div className="p-14 bg-cs-gray-900 flex flex-col gap-2">
				<div className='flex flex-col '>

				  <h3 className='text-2xl gap-2 font-extrabold flex items-center text-white'>{`CS Growth Digest`}<span className='capitalize text-base font-normal'>{`/ Ebook`}</span> </h3>
					<h4 className="md:text-4xl text-xl font-extrabold text-ellipsis overflow-hidden font-manrope  text-white mt-2">{ebook.title}</h4>
				</div>

			</div>
		</div>
	);
}

export default EbookCard;
