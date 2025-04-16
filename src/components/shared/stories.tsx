'use client'

import { Api } from '@/services/api-client'
import { IStory } from '@/services/stories'
import React from 'react'
import { Container } from './container'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'
import { useClickAway } from 'react-use'

interface Props {
  className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([])
  const [open, setOpen] = React.useState(false)
  const [selectedStory, setSelectedStory] = React.useState<IStory>()
  const storiesRef = React.useRef<HTMLDivElement>(null)
  useClickAway(storiesRef, () => setOpen(false))

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
      <Container
        className={cn(
          'flex items-center justify-between gap-2 mt-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}

        {open && (
          <div className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div ref={storiesRef} className="relative" style={{ width: 520 }}>
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
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
