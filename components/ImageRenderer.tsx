'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';

interface ImageRendererProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
};
const ImageRenderer: FC<ImageRendererProps> = ({ content }) => {
  const imageBlocks = content.blocks.filter(
    (block: any) => block.type === 'image'
  );

  return (
    <div>
      {imageBlocks.map((block: any, index: number) => (
        <CustomImageRenderer
          renders={renderers}
          key={index}
          data={block.data}
        />
      ))}
    </div>
  );
};

export function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative h-24 w-24">
      <Image className="object-contain" fill src={src} alt="image" />
    </div>
  );
}

export default ImageRenderer;
