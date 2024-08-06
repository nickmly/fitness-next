import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from '@/components/ui/sheet'
import { Dumbbell } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const MenuSheet = () => {
    return (
        <Sheet>
            <SheetTrigger className='group flex gap-2 items-center'>
                <Dumbbell className="w-8 h-8 group-hover:-translate-y-1 group-hover:rotate-90 transition-transform" />
                <h1 className='text-2xl font-extrabold tracking-widest'>nextFitness</h1>
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
                    <SheetTitle className='text-left'>
                        Dashboard
                    </SheetTitle>
                    <SheetDescription className='hidden'>
                        Dashboard
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col gap-2 mt-5'>
                    <SheetClose asChild>
                        <Button asChild variant='link' className='justify-start p-0 h-auto'>
                            <Link href='/log'>Today&apos;s Workout</Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button asChild variant='link' className='justify-start p-0 h-auto'>
                            <Link href='/exercises'>Exercise Database</Link>
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MenuSheet