import { Head } from '@inertiajs/react';
import UsuarioForm from '@/components/usuario-form';

type Props = {
    tipos: { id: number; nombre: string }[];
    roles: string[];
};

export default function UsuariosCreate({ tipos, roles }: Props) {
    return (
        <>
            <Head title="Nuevo usuario" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Nuevo usuario</h1>
                <UsuarioForm tipos={tipos} roles={roles} />
            </div>
        </>
    );
}

UsuariosCreate.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: '/usuarios' },
        { title: 'Nuevo', href: '/usuarios/create' },
    ],
};