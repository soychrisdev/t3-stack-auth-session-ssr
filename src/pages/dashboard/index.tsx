import ProtectedLayout from "components/layouts/ProtectedLayout";

export default function Dashboard() {
    return <>
        Dashboard
    </>
}

Dashboard.getLayout = (page: any) => (
    <ProtectedLayout>
        {page}
    </ProtectedLayout>
);