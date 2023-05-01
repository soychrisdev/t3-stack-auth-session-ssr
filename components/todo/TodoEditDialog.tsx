import { Button } from "components/ui/button"

import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { EditIcon } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "components/ui/select"
import { api } from "~/utils/api"
import { FormEvent, useState } from "react"
export function TodoEditDialog({ title, description, published, id, state }: { title: string, id: string, published: boolean, description: string, state: string }) {

    const [open, setOpen] = useState(false);
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
        },
        onSettled: async () => {
            await trpc.todos.getTodosById.invalidate();
        },
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        interface FormDataElements extends HTMLFormControlsCollection {
            id: HTMLInputElement;
            title: HTMLInputElement;
            description: HTMLTextAreaElement;
            state: HTMLSelectElement;
            published: HTMLInputElement;
        }

        event.preventDefault();
        const elements = event.currentTarget.elements as FormDataElements;
        const data = {
            id: elements.id.value,
            title: elements.title.value,
            description: elements.description.value,
            state: elements.state?.value || 'DOING',
            published: elements.published?.value || true,
        };

        // alert(`Here's your data: ${JSON.stringify(data, undefined, 2)}`);
        const date = new Date();
        return postTodo.mutate({
            id: data.id,
            title: data.title,
            description: data.description,
            state: "DOING",
            published: true,
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
                            <Select id="state">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a state" />
                                </SelectTrigger>
                                <SelectContent >
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
                            <Select id="published">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a publish" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="private">private</SelectItem>
                                        <SelectItem value="public">public</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>


                    </div>

                    <DialogFooter>
                        <Button type="submit" >Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
