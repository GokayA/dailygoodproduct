'use client';
import { toast } from '@/hooks/use-toast';
import { uploadFiles } from '@/lib/uploadthing';
import { PostCreationRequest, PostValidator } from '@/lib/validators/post';
import '@/styles/editor.css';
import type EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

const Editor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: '',
      subTitle: '',
      content: null,
      image: null,
    },
  });

  const ref = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const _subTitleRef = useRef<HTMLTextAreaElement>(null);
  const _imageRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: createPost } = useMutation({
    mutationFn: async ({
      subTitle,
      title,
      content,
      image,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, subTitle, content, image };
      const { data } = await axios.post('api/post/create', payload);
      return data;
    },
    onError: () => {
      return toast({
        title: 'Something went wrong',
        description: 'Post could not created',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      const newPathname = pathname.split('/').slice(0, -1).join('/');
      router.push(newPathname);
      router.refresh();
      return toast({
        description: 'Your post is created!',
      });
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Tell your opinions about the product',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], 'imageUploader');
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();
    const payload: PostCreationRequest = {
      title: data.title,
      subTitle: data.subTitle,
      content: blocks,
    };
    createPost(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...titleRest } = register('title');
  const { ref: subTitleRef, ...subTitleRest } = register('subTitle');

  return (
    <div className="w-full p-4 bg-borderShinyblue rounded-md border border-darkGray">
      <form id="post-form" className="w-fit" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 text-darkGray ">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              //@ts-ignore
              _titleRef.current = e;
            }}
            {...titleRest}
            placeholder="Product Name"
            className="text-white w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <TextareaAutosize
            ref={(e) => {
              subTitleRef(e);
              //@ts-ignore
              _subTitleRef.current = e;
            }}
            {...subTitleRest}
            placeholder="Explain your product with most 30 characters."
            className="text-white w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
          />

          <div id="editor" className="min-h-[300px]" />
        </div>
      </form>
    </div>
  );
};

export default Editor;
