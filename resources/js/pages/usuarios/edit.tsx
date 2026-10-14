import { Head } from '@inertiajs/react';
import UsuarioForm from '@/components/usuario-form';

type Props = {
    usuario: {
        id: number;
        name: string;
        email: string;
        documento_identidad: string;
        tipo_usuario_id: number | null;
        telefono: string | null;
        estado: string;
        rol: string | null;
    };
    tipos: { id: number; nombre: string }[];
    roles: string[];
};

export default function UsuariosEdit({ usuario, tipos, roles }: Props) {
    return (
        <>
            <Head title="Editar usuario" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Editar usuario</h1>
                <UsuarioForm usuario={usuario} tipos={tipos} roles={roles} />
            </div>
        </>
    );
}

UsuariosEdit.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: '/usuarios' },
        { title: 'Editar', href: '#' },
    ],
};