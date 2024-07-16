import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Dumbbell } from 'lucide-react'

const MenuSheet = () => {
    return (
        <Sheet>
            <SheetTrigger className='group flex gap-2 items-center'>
                <Dumbbell className="w-8 h-8 group-hover:-translate-y-1 group-hover:rotate-90 transition-transform" />
                <h1 className='text-2xl font-extrabold tracking-widest'>nextFitness</h1>
            </SheetTrigger>
            <SheetContent side='left'>
                Test
            </SheetContent>
        </Sheet>
    )
}

export default MenuSheet