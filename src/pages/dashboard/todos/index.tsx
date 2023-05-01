import Header from "components/layouts/Header";
import ProtectedLayout from "components/layouts/ProtectedLayout";
import { TodoEditDialog } from "components/todo/TodoEditDialog";
import { Badge } from "components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function Todos() {
    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined },
    const { data: sessionData } = useSession();
    //   );
    const { data } = api.todos.getTodosById.useQuery(
        undefined,
        { enabled: sessionData?.user !== undefined }
    )
    return (<>
        <Header title={'Todos'} />
        <div className="flex">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>


                {data ? data.map(({ title, authorId, createdAt, description, published, id, state, updatedAt }) => (
                    <Card key={id} className="m-2 w-full">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <div>
                                    {title}
                                </div>
                                <div>
                                    <Badge>{state.toLocaleLowerCase()}</Badge>

                                </div>
                            </CardTitle>
                            <CardDescription>{description} - {published ? 'public' : 'private'}</CardDescription>
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

Todos.getLayout = (page: any) => (
    <ProtectedLayout>
        {page}
    </ProtectedLayout>
);