'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { LoaderCircle, CheckIcon } from 'lucide-react'

const formSchema = z.object({
    weight: z.coerce.number({ message: "Weight is required" }),
    reps: z.coerce.number({ message: "Reps is required" })
})

export type TypedSetFormValues = z.infer<typeof formSchema>

interface Props {
    loading: boolean
    createSet: (set: TypedSetFormValues) => Promise<void>
}

const LoggedExerciseSetForm = ({ createSet, loading }: Props) => {
    const form = useForm<TypedSetFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            weight: 0,
            reps: 0
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createSet)} className="flex gap-2 justify-between items-center p-6">
                <div className="flex-[2] flex gap-2">
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl >
                                    <Input
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        type="number"
                                        min="0"
                                        {...field}
                                        onChange={event => field.onChange(parseInt(event.target.value))}
                                        end={<span className="p-1">lbs</span>}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reps"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        type="number"
                                        min="0"
                                        {...field}
                                        onChange={event => field.onChange(parseInt(event.target.value))}
                                        end={<span className="p-1">reps</span>}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={loading} className="self-start" title="Finish set">
                    {loading ? <LoaderCircle className='animate-spin w-4 h-4' /> : <CheckIcon />}
                </Button>
            </form>
        </Form>
    )
}
export default LoggedExerciseSetForm