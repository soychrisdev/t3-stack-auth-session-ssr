import Header from "components/layouts/Header";
import ProtectedLayout from "components/layouts/ProtectedLayout";
import Todo from "components/todo/Todo";
import { TodoEditDialog } from "components/todo/TodoEditDialog";
import { Badge } from "components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {clearGlobCache} from "@typescript-eslint/typescript-estree/dist/parseSettings/resolveProjectList";
import {TodoCreateDialog} from "../../../../components/todo/TodoCreateDialog";

export default function Todos() {
    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined },
    const { data: sessionData } = useSession();
    //   );
    const { data, isLoading } = api.todos.getTodosById.useQuery(
        undefined,
        { enabled: sessionData?.user !== undefined }
    )


    return (<>
        <Header title={'Todos'} />
        <TodoCreateDialog/>

        <Todo data={data}/>


    </>)
}

Todos.getLayout = (page: any) => (
    <ProtectedLayout>
        {page}
    </ProtectedLayout>
);