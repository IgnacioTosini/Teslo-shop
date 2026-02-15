export const revalidate = 0;

import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { getPaginatedUsers } from '../../../../actions';
import { UserTable } from './ui/UserTable';

export default async function OrdersPage() {
    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect('/auth/login')
    }

    return (
        <>
            <Title title="Mantenimiento de usuarios" />
            <div className="mb-10">
                <UserTable users={users} />
            </div>
        </>
    );
}