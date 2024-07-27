import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Dumbbell } from 'lucide-react'
import CustomLink from '../ui/custom-link'

const MenuSheet = () => {
    return (
        <Sheet>
            <SheetTrigger className='group flex gap-2 items-center'>
                <Dumbbell className="w-8 h-8 group-hover:-translate-y-1 group-hover:rotate-90 transition-transform" />
                <h1 className='text-2xl font-extrabold tracking-widest'>nextFitness</h1>
            </SheetTrigger>
            <SheetContent side='left'>
                <div className='flex flex-col gap-2 mt-5'>
                    <SheetClose asChild>
                        <CustomLink href='/log'>Today's Workout</CustomLink>
                    </SheetClose>
                    <SheetClose asChild>
                        <CustomLink href='/exercises'>Exercise Database</CustomLink>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MenuSheet