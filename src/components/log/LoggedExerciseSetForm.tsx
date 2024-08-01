'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { LoaderCircle, CheckIcon } from 'lucide-react'
import { SetType, TypedSet } from '@prisma/client'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'

const weightRepsFormSchema = z.object({
    weight: z.coerce.number({ message: 'Weight is required' }).min(0).max(999),
    reps: z.coerce.number({ message: 'Reps is required' }).min(0).max(999),
})

const timeDistanceFormSchema = z.object({
    minutes: z.coerce.number({ message: 'Minutes are required' }).min(0).max(60),
    seconds: z.coerce.number({ message: 'Seconds are required' }).min(0).max(59),
    distance: z.coerce.number({ message: 'Distance is required' }).multipleOf(0.1).min(0).max(999),
})

export type WeightRepsSetFormValues = z.infer<typeof weightRepsFormSchema>
export type TimeDistanceSetFormValues = z.infer<typeof timeDistanceFormSchema>
export type TypedSetFormValues = WeightRepsSetFormValues | TimeDistanceSetFormValues & { type: SetType }

interface Props {
    loading: boolean
    existingSet: TypedSet | null
    createSet: (set: TypedSetFormValues) => Promise<void>
    updateSet: (set: TypedSet) => Promise<void>
}

const LoggedExerciseSetForm = ({ loading, existingSet, createSet, updateSet }: Props) => {
    const [currentType, setCurrentType] = useState<string>(existingSet?.type || 'WEIGHT_REPS')

    const weightRepsForm = useForm<WeightRepsSetFormValues>({
        resolver: zodResolver(weightRepsFormSchema),
        defaultValues: {
            weight: existingSet?.weight || 0,
            reps: existingSet?.reps || 0,
        }
    })

    const timeDistanceForm = useForm<TimeDistanceSetFormValues>({
        resolver: zodResolver(timeDistanceFormSchema),
        defaultValues: {
            minutes: existingSet?.minutes || 0,
            seconds: existingSet?.seconds || 0,
            distance: existingSet?.distance || 0
        }
    })

    const handleSubmit = (values: WeightRepsSetFormValues | TimeDistanceSetFormValues) => {
        if (existingSet) {
            updateSet({
                ...existingSet,
                ...values,
                type: currentType as SetType
            })
        } else {
            createSet({
                ...values,
                type: currentType as SetType
            })
        }
    }

    return (
        <>
            <div className='px-6 mt-3'>
                <Select onValueChange={setCurrentType} defaultValue={currentType}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='WEIGHT_REPS'>Weight x Reps</SelectItem>
                        <SelectItem value='TIME_DISTANCE'>Time x Distance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {currentType === 'WEIGHT_REPS' &&
                <Form {...weightRepsForm}>
                    <form onSubmit={weightRepsForm.handleSubmit(handleSubmit)} className='flex gap-2 justify-between items-center p-6'>
                        <div className='flex-[2] flex gap-2'>
                            <FormField
                                control={weightRepsForm.control}
                                name='weight'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl >
                                            <Input
                                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={event => field.onChange(parseInt(event.target.value))}
                                                end={<span className='p-1'>lbs</span>}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={weightRepsForm.control}
                                name='reps'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input
                                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={event => field.onChange(parseInt(event.target.value))}
                                                end={<span className='p-1'>reps</span>}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' disabled={loading} className='self-start' title='Finish set'>
                            {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <CheckIcon />}
                        </Button>
                    </form>
                </Form>
            }
            {currentType === 'TIME_DISTANCE' &&
                <Form {...timeDistanceForm}>
                    <form onSubmit={timeDistanceForm.handleSubmit(handleSubmit)} className='flex gap-2 justify-between items-center p-6'>
                        <div className='flex-[2] flex gap-2'>
                            <FormField
                                control={timeDistanceForm.control}
                                name='distance'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl >
                                            <Input
                                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                min='0'
                                                step='0.1'
                                                {...field}
                                                onChange={event => field.onChange(parseFloat(event.target.value))}
                                                end={<span className='p-1'>km</span>}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={timeDistanceForm.control}
                                name='minutes'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input
                                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={event => field.onChange(parseInt(event.target.value))}
                                                end={<span className='p-1'>min</span>}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={timeDistanceForm.control}
                                name='seconds'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormControl>
                                            <Input
                                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={event => field.onChange(parseInt(event.target.value))}
                                                end={<span className='p-1'>sec</span>}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' disabled={loading} className='self-start' title='Finish set'>
                            {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <CheckIcon />}
                        </Button>
                    </form>
                </Form>
            }
        </>
    )
}
export default LoggedExerciseSetForm