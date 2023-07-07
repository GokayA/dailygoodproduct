'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';

const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
);
interface EditorOutputProps {
  content: any;
}
const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
};
const renderers = {
  image: CustomImageRenderer,
};
const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  // Extracting only image blocks from content
  const imageBlocks = content.blocks.filter(
    (block: any) => block.type === 'image'
  );

  return (
    <div>
      {imageBlocks.map((block: any, index: number) => (
        <CustomImageRenderer key={index} data={block.data} />
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

export default EditorOutput;
