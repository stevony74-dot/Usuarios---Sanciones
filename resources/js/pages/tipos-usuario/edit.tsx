import { Head } from '@inertiajs/react';
import TipoUsuarioForm from '@/components/tipo-usuario-form';

type Tipo = {
    id: number;
    nombre: string;
    max_prestamos: number;
    dias_prestamo_default: number;
};

export default function TiposUsuarioEdit({ tipo }: { tipo: Tipo }) {
    return (
        <>
            <Head title="Editar tipo de usuario" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Editar tipo de usuario</h1>
                <TipoUsuarioForm tipo={tipo} />
            </div>
        </>
    );
}

TiposUsuarioEdit.layout = {
    breadcrumbs: [
        { title: 'Tipos de usuario', href: '/tipos-usuario' },
        { title: 'Editar', href: '#' },
    ],
};