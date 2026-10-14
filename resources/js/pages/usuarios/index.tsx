import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Usuario = {
    id: number;
    name: string;
    email: string;
    documento_identidad: string;
    telefono: string | null;
    estado: string;
    tipo: string | null;
    rol: string | null;
};

export default function UsuariosIndex({ usuarios }: { usuarios: Usuario[] }) {
    const { errors } = usePage<{ errors: Record<string, string> }>().props;

    function eliminar(u: Usuario) {
        if (confirm(`¿Eliminar al usuario "${u.name}"?`)) {
            router.delete(`/usuarios/${u.id}`, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Usuarios" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Usuarios</h1>
                    <Button asChild>
                        <Link href="/usuarios/create">Nuevo usuario</Link>
                    </Button>
                </div>

                {errors.usuario && <p className="text-sm text-red-500">{errors.usuario}</p>}

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Correo</th>
                                <th className="p-3">Documento</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3">Rol</th>
                                <th className="p-3">Estado</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u) => (
                                <tr key={u.id} className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border">
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">{u.documento_identidad}</td>
                                    <td className="p-3">{u.tipo}</td>
                                    <td className="p-3">{u.rol}</td>
                                    <td className="p-3 capitalize">{u.estado}</td>
                                    <td className="flex gap-2 p-3">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/usuarios/${u.id}/edit`}>Editar</Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => eliminar(u)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

UsuariosIndex.layout = {
    breadcrumbs: [{ title: 'Usuarios', href: '/usuarios' }],
};