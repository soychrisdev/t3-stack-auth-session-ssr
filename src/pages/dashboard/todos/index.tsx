import Header from "components/layouts/Header";
import ProtectedLayout from "components/layouts/ProtectedLayout";

export default function Todos() {
    return (<>
        <Header title={'Todos'} />
        Todos web page
    </>)
}

Todos.getLayout = (page: any) => (
    <ProtectedLayout>
        {page}
    </ProtectedLayout>
);