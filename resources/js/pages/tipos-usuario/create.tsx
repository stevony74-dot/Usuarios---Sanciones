import { Head } from '@inertiajs/react';
import TipoUsuarioForm from '@/components/tipo-usuario-form';

export default function TiposUsuarioCreate() {
    return (
        <>
            <Head title="Nuevo tipo de usuario" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Nuevo tipo de usuario</h1>
                <TipoUsuarioForm />
            </div>
        </>
    );
}

TiposUsuarioCreate.layout = {
    breadcrumbs: [
        { title: 'Tipos de usuario', href: '/tipos-usuario' },
        { title: 'Nuevo', href: '/tipos-usuario/create' },
    ],
};