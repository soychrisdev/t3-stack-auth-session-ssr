import React, { ReactNode } from 'react';
interface PublicLayoutProps {
    children: ReactNode;
}
const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <nav
                style={{
                    backgroundColor: '#1E293B',
                    color: 'white',
                    minWidth: '16rem',
                    padding: '2rem',
                }}
            >
                {/* Sidebar content */}
                <h1>public</h1>
            </nav>
            <main style={{ flex: 1, padding: '2rem' }}>
                {/* Main content */}
                {children}
            </main>
        </div>
    );
};
export default PublicLayout;