'use client';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { cn } from '@/lib/utils';
import { Post, Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CommandEmpty, CommandGroup, CommandList } from 'cmdk';
import debounce from 'lodash.debounce';
import { PackageSearch } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Command, CommandInput, CommandItem } from './ui/Command';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setInput('');
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Post & { _count: Prisma.PostCountOutputType })[];
    },
    queryKey: ['search-query'],
    enabled: false,
  });

  useEffect(() => {
    setInput('');
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative max-w-lg z-20 overflow-visible bg-greenBlack text-darkGray border border-borderShinyblue rounded-md"
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0 placeholder:text-darkGray"
        placeholder="Search products..."
      />
      {input.length > 0 && (
        <CommandList className="absolute bg-borderShinyblue top-full inset-x-0">
          {isFetched && (
            <CommandEmpty className="bg-borderShinyblue  pl-1">
              No results found.
            </CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Products">
              {queryResults?.map((product) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/post/${e}`);
                    router.refresh();
                  }}
                  key={product.id}
                  value={product.title}
                >
                  <PackageSearch className="mr-2 h-4 w-4" />
                  <a href={`/post/${product.id}`}>{product.title}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
