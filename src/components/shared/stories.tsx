'use client'

import { Api } from '@/services/api-client'
import { IStory } from '@/services/stories'
import React from 'react'
import { Container } from './container'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { useClickAway, useWindowSize } from 'react-use'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
interface Props {
  className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([])
  const [open, setOpen] = React.useState(false)
  const [selectedStory, setSelectedStory] = React.useState<IStory>()
  const storiesRef = React.useRef<HTMLDivElement>(null)
  useClickAway(storiesRef, () => setOpen(false))
  const { width, height } = useWindowSize()
  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll()
      console.log(data)

      setStories(data)
    }

    fetchStories()
  }, [])

  const onClickStory = (story: IStory) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  return (
    <>
      <Container className={cn('flex w-full mt-5 sm:mt-10', className)}>
        <Carousel className="w-full ">
          <CarouselContent className="flex justify-between">
            {stories.length === 0 &&
              [...Array(6)].map((_, index) => (
                <CarouselItem
                  className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center items-center"
                  key={index}
                >
                  <div className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
                </CarouselItem>
              ))}
            {stories.map((story) => (
              <CarouselItem
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center items-center"
                key={story.id}
              >
                <Image
                  onClick={() => onClickStory(story)}
                  className="rounded-md cursor-pointer w-full"
                  height={250}
                  width={200}
                  alt={'story'}
                  src={story.previewImageUrl}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {open && (
          <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div
              ref={storiesRef}
              className="relative"
              style={{ width: width > 550 ? 520 : width }}
            >
              <button
                className="absolute cursor-pointer -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={width > 550 ? 520 : width}
                height={0.8 * height}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
