import { Button } from "components/ui/button"

import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { PlusIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select"
import { api } from "~/utils/api"
import { FormEvent, useRef, useState } from "react"
import { useToast } from "components/ui/use-toast"
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "../ui/sheet";


export function TodoCreateDialog() {
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const [stateValue, setStateValue] = useState("DOING")
    const [publishedValue, setPublishedValue] = useState("false")
    const trpc = api.useContext();
    const createTodo = api.todos.createTodo.useMutation( {

        onMutate: async ({ description, published, state, title }) => {
            await trpc.todos.getTodosById.cancel()

            const newTodo = {
                title,
                description,
                state,
                published,
            }

            // Clear input
            setStateValue(stateValue)
            setPublishedValue(publishedValue)

            // Return a context object with the snapshotted value
            return newTodo

        },
        onSuccess: (err) => {


            setOpen(false)
            toast({
                title: "Task updated!",
                description: "Task updated success!",

            })
        },
        onSettled: async () => {
            await trpc.todos.getTodosById.invalidate();

        },

        onError: (err) => {
            toast({
                variant: "destructive",
                title: "Ops! Update failed",
                description: { err },

            })
        },

    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        interface FormDataElements extends HTMLFormControlsCollection {
            title: HTMLInputElement;
            description: HTMLTextAreaElement;

        }

        event.preventDefault();
        const elements = event.currentTarget.elements as FormDataElements;
        const data = {
            title: elements.title.value,
            description: elements.description.value,

        };

        // alert(`Here's your data: ${JSON.stringify(data, undefined, 2)}`);
        return createTodo.mutate({
            title: data.title,
            description: data.description,
            state: stateValue,
            published: publishedValue,
        })



    }
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen} >
                <SheetTrigger><PlusIcon /></SheetTrigger>
                <SheetContent position={'bottom'}>
                    <SheetHeader>
                            <SheetTitle>Create a task</SheetTitle>
                        <SheetDescription>
                            <form onSubmit={handleSubmit}>

                                <div className="grid gap-4 py-4">

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            title
                                        </Label>
                                        <Input id="title" className="col-span-3" placeholder={'insert title'} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            description
                                        </Label>
                                        <Input id="description" className="col-span-3" placeholder={'insert description'} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="state" className="text-right">
                                            state
                                        </Label>
                                        <Select value={stateValue}  onValueChange={setStateValue} required>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                            <SelectContent  >
                                                <SelectGroup >
                                                    <SelectItem value='DOING'>DOING</SelectItem>
                                                    <SelectItem value="DONE">DONE</SelectItem>
                                                    <SelectItem value="STANDBY">STANDBY</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="published" className="text-right">
                                            published
                                        </Label>
                                        <Select value={publishedValue} onValueChange={setPublishedValue}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a publish" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value={"false"}>private</SelectItem>
                                                    <SelectItem value={"true"}>public</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>


                                </div>

                                <DialogFooter className='flex justify-center'>
                                    <Button type="submit" >Create!</Button>
                                </DialogFooter>
                            </form>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>

    )
}
