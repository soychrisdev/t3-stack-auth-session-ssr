interface IAccount {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    refresh_token_expires_in?: number;
    user: IUser;
}

interface ISession {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: IUser;
}

interface IUser {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    accounts: IAccount[];
    sessions: ISession[];
    role: string;
    todos: ITodo[];
}

interface IVerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}

interface ITodo {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    published: string;
    title: string;
    state: string;
    description: string;
    author?: IUser;
    authorId?: string;
}


