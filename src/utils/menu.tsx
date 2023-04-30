import { HomeIcon, LayoutListIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
export const menu = [
    { name: 'Home', to: '/dashboard', icon: <HomeIcon /> },
    { name: 'Todos', to: '/dashboard/todos', icon: <LayoutListIcon /> },

]
// TODO: DO A LOGOUT BUTTON