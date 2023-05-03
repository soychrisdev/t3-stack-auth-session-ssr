import { Button } from "components/ui/button"

import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { EditIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select"
import { api } from "~/utils/api"
import { FormEvent, useRef, useState } from "react"
import { useToast } from "components/ui/use-toast"


export function TodoEditDialog({ title, description, published, id, state }: { title: string, id: string, published: string, description: string, state: string }) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    const [stateValue, setStateValue] = useState(state)
    const [publishedValue, setPublishedValue] = useState(published)
    const trpc = api.useContext();
    const postTodo = api.todos.mutateTodo.useMutation({
        onMutate: async ({ description, id, published, state, title, updatedAt }) => {
            await trpc.todos.getTodosById.cancel();

            const previousTodos = trpc.todos.getTodosById.getData()

            trpc.todos.getTodosById.setData(undefined, (prev: any) => {
                if (!prev) return previousTodos
                return prev.map(t => {
                    if (t.id === id) {
                        return ({
                            ...t,
                            description,
                            published,
                            title,
                            state,
                            updatedAt
                        })
                    }
                    return t
                })
            })

            return { previousTodos }

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
            id: HTMLInputElement;
            title: HTMLInputElement;
            description: HTMLTextAreaElement;

        }

        event.preventDefault();
        const elements = event.currentTarget.elements as FormDataElements;
        const data = {
            id: elements.id.value,
            title: elements.title.value,
            description: elements.description.value,

        };

        // alert(`Here's your data: ${JSON.stringify(data, undefined, 2)}`);
        const date = new Date();
        return postTodo.mutate({
            id: data.id,
            title: data.title,
            description: data.description,
            state: stateValue,
            published: publishedValue,
            updatedAt: date
        })



    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><EditIcon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>task: {title}</DialogTitle>
                    <DialogDescription>
                        task id: {id ? id : 'no id'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">
                                id
                            </Label>
                            <Input id="id" value={id} className="col-span-3" disabled />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                title
                            </Label>
                            <Input id="title" className="col-span-3" placeholder={title} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                description
                            </Label>
                            <Input id="description" className="col-span-3" placeholder={description} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">
                                state
                            </Label>
                            <Select value={stateValue} onValueChange={setStateValue} required>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                <SelectContent  >
                                    <SelectGroup >
                                        <SelectItem value="DOING">DOING</SelectItem>
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

                    <DialogFooter>
                        <Button type="submit" >Update todo!</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
