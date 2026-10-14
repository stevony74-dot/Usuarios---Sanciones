import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Tipo = {
    id?: number;
    nombre: string;
    max_prestamos: number;
    dias_prestamo_default: number;
};

export default function TipoUsuarioForm({ tipo }: { tipo?: Tipo }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nombre: tipo?.nombre ?? '',
        max_prestamos: tipo?.max_prestamos ?? 3,
        dias_prestamo_default: tipo?.dias_prestamo_default ?? 7,
    });

    function enviar(e: FormEvent) {
        e.preventDefault();
        if (tipo?.id) {
            put(`/tipos-usuario/${tipo.id}`);
        } else {
            post('/tipos-usuario');
        }
    }

    return (
        <form onSubmit={enviar} className="flex max-w-md flex-col gap-4">
            <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                    id="nombre"
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                />
                {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="max_prestamos">Máximo de préstamos</Label>
                <Input
                    id="max_prestamos"
                    type="number"
                    value={data.max_prestamos}
                    onChange={(e) => setData('max_prestamos', Number(e.target.value))}
                />
                {errors.max_prestamos && <p className="text-sm text-red-500">{errors.max_prestamos}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="dias_prestamo_default">Días de préstamo</Label>
                <Input
                    id="dias_prestamo_default"
                    type="number"
                    value={data.dias_prestamo_default}
                    onChange={(e) => setData('dias_prestamo_default', Number(e.target.value))}
                />
                {errors.dias_prestamo_default && (
                    <p className="text-sm text-red-500">{errors.dias_prestamo_default}</p>
                )}
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    Guardar
                </Button>
                <Button asChild variant="outline">
                    <Link href="/tipos-usuario">Cancelar</Link>
                </Button>
            </div>
        </form>
    );
}