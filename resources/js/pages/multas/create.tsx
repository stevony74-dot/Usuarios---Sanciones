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

export default function MultasCreate({ usuarios }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        motivo: 'atraso',
        monto: '',
        dias_atraso: '',
        observaciones: '',
    });

    function enviar(e: FormEvent) {
        e.preventDefault();
        post('/multas');
    }

    return (
        <>
            <Head title="Nueva multa" />
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold">Nueva multa</h1>

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
                        <select
                            id="motivo"
                            className={claseSelect}
                            value={data.motivo}
                            onChange={(e) => setData('motivo', e.target.value)}
                        >
                            <option value="atraso">Atraso</option>
                            <option value="perdida">Pérdida</option>
                            <option value="dano">Daño</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.motivo && <p className="text-sm text-red-500">{errors.motivo}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="monto">Monto</Label>
                        <Input
                            id="monto"
                            type="number"
                            step="0.01"
                            value={data.monto}
                            onChange={(e) => setData('monto', e.target.value)}
                        />
                        {errors.monto && <p className="text-sm text-red-500">{errors.monto}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="dias_atraso">Días de atraso (solo si es por atraso)</Label>
                        <Input
                            id="dias_atraso"
                            type="number"
                            value={data.dias_atraso}
                            onChange={(e) => setData('dias_atraso', e.target.value)}
                        />
                        {errors.dias_atraso && <p className="text-sm text-red-500">{errors.dias_atraso}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="observaciones">Observaciones</Label>
                        <textarea
                            id="observaciones"
                            rows={3}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            value={data.observaciones}
                            onChange={(e) => setData('observaciones', e.target.value)}
                        />
                        {errors.observaciones && <p className="text-sm text-red-500">{errors.observaciones}</p>}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Guardar
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/multas">Cancelar</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

MultasCreate.layout = {
    breadcrumbs: [
        { title: 'Multas', href: '/multas' },
        { title: 'Nueva', href: '/multas/create' },
    ],
};