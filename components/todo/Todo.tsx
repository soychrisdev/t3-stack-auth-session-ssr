import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { TodoEditDialog } from "./TodoEditDialog";
import { Badge } from "components/ui/badge";



export default function Todo({ data }: { data: ITodo[] }) {
    return (<>
        <div className="flex">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>


                {data ? data.map(({ title, authorId, createdAt, description, published, id, state, updatedAt }) => (
                    <Card key={id} className="w-full hover:bg-slate-50">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <div>
                                    {title}
                                </div>
                                <div className="ml-2">
                                    <Badge>{state}</Badge>

                                </div>
                            </CardTitle>
                            <CardDescription>{description} - {published}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            contenido
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <div>
                                {updatedAt.toISOString().split('T')[0]}
                            </div>
                            <div>
                                <TodoEditDialog key={id} title={title} description={description} state={state} published={published} id={id} />
                            </div>
                        </CardFooter>
                    </Card>
                )
                ) :
                    'no data'}

            </div>

        </div>
    </>)
}