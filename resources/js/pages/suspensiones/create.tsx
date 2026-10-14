import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    usuarios: { id: number; name: string; documento_identidad: string }[];
};

const claseSelect =
    'h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function SuspensionesCreate({ usuarios }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        motivo: '',
        fecha_inicio: '',
        fecha_fin: '',
    });

    function enviar(e: FormEvent) {
        e.preventDefault();
        post('/suspensiones');
    }

    return (
        <>
            <Head title="Nueva suspensión" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Nueva suspensión</h1>

                <form onSubmit={enviar} className="flex max-w-md flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="user_id">Usuario</Label>
                        <select
                            id="user_id"
                            className={claseSelect}
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                        >
                            <option value="">Selecciona un usuario</option>
                            {usuarios.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.documento_identidad})
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-sm text-red-500">{errors.user_id}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="motivo">Motivo</Label>
                        <textarea
                            id="motivo"
                            rows={3}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            value={data.motivo}
                            onChange={(e) => setData('motivo', e.target.value)}
                        />
                        {errors.motivo && <p className="text-sm text-red-500">{errors.motivo}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fecha_inicio">Fecha de inicio</Label>
                        <Input
                            id="fecha_inicio"
                            type="date"
                            value={data.fecha_inicio}
                            onChange={(e) => setData('fecha_inicio', e.target.value)}
                        />
                        {errors.fecha_inicio && <p className="text-sm text-red-500">{errors.fecha_inicio}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fecha_fin">Fecha de fin (déjala vacía si es indefinida)</Label>
                        <Input
                            id="fecha_fin"
                            type="date"
                            value={data.fecha_fin}
                            onChange={(e) => setData('fecha_fin', e.target.value)}
                        />
                        {errors.fecha_fin && <p className="text-sm text-red-500">{errors.fecha_fin}</p>}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Guardar
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/suspensiones">Cancelar</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SuspensionesCreate.layout = {
    breadcrumbs: [
        { title: 'Suspensiones', href: '/suspensiones' },
        { title: 'Nueva', href: '/suspensiones/create' },
    ],
};