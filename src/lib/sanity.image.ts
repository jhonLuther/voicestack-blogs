import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/lib/sanity.api';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

interface ImageDimensions {
  width?: number;
  height?: number;
  quality?: number;
}

export const urlForImage = (source: any, dimensions?: ImageDimensions) => {

  if (typeof source === 'string') {
    source = {
      asset: {
        _ref: source,
        _type: 'reference',
      },
      _type: 'image',
    };
  }

  if (!source?.asset?._ref) {
    return undefined;
  }

  let urlBuilder = imageBuilder.image(source).auto('format');

  if (dimensions) {
    console.log({dimensions});
    
    if (dimensions.width) {
      urlBuilder = urlBuilder.width(Math.round(dimensions.width));
    }
    if (dimensions.height) {
      urlBuilder = urlBuilder.height(Math.round(dimensions.height));
    }
    urlBuilder = urlBuilder.quality(dimensions.quality || 90);
  }

  console.log({url:urlBuilder.url()});
  

  return urlBuilder.url();
};