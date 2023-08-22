import { Gutter } from '@/components/gutter'
import { Skeleton } from '@/components/ui/skeleton'
import { VerticalPadding } from '@/components/vertical-padding'
import React from 'react'

const Loading = () => {
  return (
    <main className='flex-1'>
        {/* Hero */}
        <Skeleton className='h-96 w-full bg-primary animate-[pulse_5s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]'/>
        {/* Content */}
        <VerticalPadding>
        <Gutter>
            <Skeleton className='h-96 w-full'/>
        </Gutter>
        </VerticalPadding>
    </main>
  )
}

export default Loading