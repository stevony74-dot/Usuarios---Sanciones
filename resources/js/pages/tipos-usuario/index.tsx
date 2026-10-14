import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Tipo = {
    id: number;
    nombre: string;
    max_prestamos: number;
    dias_prestamo_default: number;
    users_count: number;
};

export default function TiposUsuarioIndex({ tipos }: { tipos: Tipo[] }) {
    const { errors } = usePage<{ errors: Record<string, string> }>().props;

    function eliminar(tipo: Tipo) {
        if (confirm(`¿Eliminar el tipo "${tipo.nombre}"?`)) {
            router.delete(`/tipos-usuario/${tipo.id}`, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Tipos de usuario" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tipos de usuario</h1>
                    <Button asChild>
                        <Link href="/tipos-usuario/create">Nuevo tipo</Link>
                    </Button>
                </div>

                {errors.tipo && <p className="text-sm text-red-500">{errors.tipo}</p>}

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Máx. préstamos</th>
                                <th className="p-3">Días de préstamo</th>
                                <th className="p-3">Usuarios</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.map((tipo) => (
                                <tr key={tipo.id} className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border">
                                    <td className="p-3">{tipo.nombre}</td>
                                    <td className="p-3">{tipo.max_prestamos}</td>
                                    <td className="p-3">{tipo.dias_prestamo_default}</td>
                                    <td className="p-3">{tipo.users_count}</td>
                                    <td className="flex gap-2 p-3">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/tipos-usuario/${tipo.id}/edit`}>Editar</Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => eliminar(tipo)}>
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

TiposUsuarioIndex.layout = {
    breadcrumbs: [{ title: 'Tipos de usuario', href: '/tipos-usuario' }],
};