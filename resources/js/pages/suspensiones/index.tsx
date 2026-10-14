import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Suspension = {
    id: number;
    usuario: string | null;
    documento: string | null;
    motivo: string;
    fecha_inicio: string | null;
    fecha_fin: string;
    activa: boolean;
    creada_por: string | null;
};

export default function SuspensionesIndex({ suspensiones }: { suspensiones: Suspension[] }) {
    const { errors } = usePage<{ errors: Record<string, string> }>().props;

    function levantar(s: Suspension) {
        if (confirm(`¿Levantar la suspensión de ${s.usuario}?`)) {
            router.post(`/suspensiones/${s.id}/levantar`, {}, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Suspensiones" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Suspensiones</h1>
                    <Button asChild>
                        <Link href="/suspensiones/create">Nueva suspensión</Link>
                    </Button>
                </div>

                {errors.suspension && <p className="text-sm text-red-500">{errors.suspension}</p>}

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Usuario</th>
                                <th className="p-3">Documento</th>
                                <th className="p-3">Motivo</th>
                                <th className="p-3">Inicio</th>
                                <th className="p-3">Fin</th>
                                <th className="p-3">Estado</th>
                                <th className="p-3">Registrada por</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suspensiones.length === 0 && (
                                <tr>
                                    <td className="p-3 text-muted-foreground" colSpan={8}>
                                        Aún no hay suspensiones registradas.
                                    </td>
                                </tr>
                            )}
                            {suspensiones.map((s) => (
                                <tr key={s.id} className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border">
                                    <td className="p-3">{s.usuario}</td>
                                    <td className="p-3">{s.documento}</td>
                                    <td className="p-3">{s.motivo}</td>
                                    <td className="p-3">{s.fecha_inicio}</td>
                                    <td className="p-3">{s.fecha_fin}</td>
                                    <td className="p-3">{s.activa ? 'Activa' : 'Levantada'}</td>
                                    <td className="p-3">{s.creada_por}</td>
                                    <td className="flex gap-2 p-3">
                                        {s.activa && (
                                            <Button size="sm" variant="outline" onClick={() => levantar(s)}>
                                                Levantar
                                            </Button>
                                        )}
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

SuspensionesIndex.layout = {
    breadcrumbs: [{ title: 'Suspensiones', href: '/suspensiones' }],
};