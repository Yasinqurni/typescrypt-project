export enum ExampleStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned'
}
export class Example {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    age: number;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
    status: ExampleStatus;
    is_verified: boolean;
}

export const dbName = 'example'