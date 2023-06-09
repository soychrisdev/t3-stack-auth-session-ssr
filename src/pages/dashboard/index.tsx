import Header from "components/layouts/Header";
import ProtectedLayout from "components/layouts/ProtectedLayout";

export default function Dashboard() {
    return <>
        <Header title={'Dashboard'} />
        Dashboard
    </>
}

Dashboard.getLayout = (page: any) => (
    <ProtectedLayout>
        {page}
    </ProtectedLayout>
);