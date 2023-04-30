import Sidebar from 'components/sidebar/Sidebar';
import React, { ReactNode } from 'react';
interface ProtectedLayoutProps {
    children: ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar>
                {children}
            </Sidebar>
        </div>
    );
};
export default ProtectedLayout;