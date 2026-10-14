import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Multa = {
    id: number;
    usuario: string | null;
    documento: string | null;
    motivo: string;
    monto: string;
    dias_atraso: number | null;
    estado: string;
    fecha_generacion: string | null;
    fecha_pago: string | null;
    observaciones: string | null;
};

export default function MultasIndex({ multas }: { multas: Multa[] }) {
    const { errors } = usePage<{ errors: Record<string, string> }>().props;

    function pagar(m: Multa) {
        if (confirm(`¿Marcar como pagada la multa de ${m.usuario}?`)) {
            router.post(`/multas/${m.id}/pagar`, {}, { preserveScroll: true });
        }
    }

    function condonar(m: Multa) {
        if (confirm(`¿Condonar la multa de ${m.usuario}?`)) {
            router.post(`/multas/${m.id}/condonar`, {}, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Multas" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Multas</h1>
                    <Button asChild>
                        <Link href="/multas/create">Nueva multa</Link>
                    </Button>
                </div>

                {errors.multa && <p className="text-sm text-red-500">{errors.multa}</p>}

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                            <tr>
                                <th className="p-3">Usuario</th>
                                <th className="p-3">Documento</th>
                                <th className="p-3">Motivo</th>
                                <th className="p-3">Monto</th>
                                <th className="p-3">Días de atraso</th>
                                <th className="p-3">Estado</th>
                                <th className="p-3">Generada</th>
                                <th className="p-3">Pagada</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {multas.length === 0 && (
                                <tr>
                                    <td className="p-3 text-muted-foreground" colSpan={9}>
                                        Aún no hay multas registradas.
                                    </td>
                                </tr>
                            )}
                            {multas.map((m) => (
                                <tr key={m.id} className="border-b border-sidebar-border/70 last:border-0 dark:border-sidebar-border">
                                    <td className="p-3">{m.usuario}</td>
                                    <td className="p-3">{m.documento}</td>
                                    <td className="p-3 capitalize">{m.motivo}</td>
                                    <td className="p-3">{m.monto}</td>
                                    <td className="p-3">{m.dias_atraso ?? '-'}</td>
                                    <td className="p-3 capitalize">{m.estado}</td>
                                    <td className="p-3">{m.fecha_generacion}</td>
                                    <td className="p-3">{m.fecha_pago ?? '-'}</td>
                                    <td className="flex gap-2 p-3">
                                        {m.estado === 'pendiente' && (
                                            <>
                                                <Button size="sm" onClick={() => pagar(m)}>
                                                    Pagar
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => condonar(m)}>
                                                    Condonar
                                                </Button>
                                            </>
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

MultasIndex.layout = {
    breadcrumbs: [{ title: 'Multas', href: '/multas' }],
};