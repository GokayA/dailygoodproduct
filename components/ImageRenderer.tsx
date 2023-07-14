'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

interface ImageRendererProps {
  content: any;
  className: string;
}

const renderers = {
  image: CustomImageRenderer,
};
const ImageRenderer: FC<ImageRendererProps> = ({ content, className }) => {
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
          className={className}
        />
      ))}
    </div>
  );
};

export function CustomImageRenderer({ data, className, ...props }: any) {
  const src = data.file.url;

  return (
    <div className={cn('relative w-12 h-12', className)} {...props}>
      <Image className="object-contain" fill src={src} alt="image" />
    </div>
  );
}

export default ImageRenderer;
