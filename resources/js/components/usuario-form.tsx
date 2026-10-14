import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Usuario = {
    id?: number;
    name: string;
    email: string;
    documento_identidad: string;
    tipo_usuario_id: number | null;
    telefono: string | null;
    estado: string;
    rol: string | null;
};

type Props = {
    usuario?: Usuario;
    tipos: { id: number; nombre: string }[];
    roles: string[];
};

const claseSelect =
    'h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function UsuarioForm({ usuario, tipos, roles }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: usuario?.name ?? '',
        email: usuario?.email ?? '',
        documento_identidad: usuario?.documento_identidad ?? '',
        tipo_usuario_id: String(usuario?.tipo_usuario_id ?? ''),
        telefono: usuario?.telefono ?? '',
        estado: usuario?.estado ?? 'activo',
        rol: usuario?.rol ?? 'Consulta',
        password: '',
    });

    function enviar(e: FormEvent) {
        e.preventDefault();
        if (usuario?.id) {
            put(`/usuarios/${usuario.id}`);
        } else {
            post('/usuarios');
        }
    }

    return (
        <form onSubmit={enviar} className="flex max-w-md flex-col gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="documento_identidad">Documento de identidad</Label>
                <Input
                    id="documento_identidad"
                    value={data.documento_identidad}
                    onChange={(e) => setData('documento_identidad', e.target.value)}
                />
                {errors.documento_identidad && <p className="text-sm text-red-500">{errors.documento_identidad}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tipo_usuario_id">Tipo de usuario</Label>
                <select
                    id="tipo_usuario_id"
                    className={claseSelect}
                    value={data.tipo_usuario_id}
                    onChange={(e) => setData('tipo_usuario_id', e.target.value)}
                >
                    <option value="">Selecciona un tipo</option>
                    {tipos.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.nombre}
                        </option>
                    ))}
                </select>
                {errors.tipo_usuario_id && <p className="text-sm text-red-500">{errors.tipo_usuario_id}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" value={data.telefono} onChange={(e) => setData('telefono', e.target.value)} />
                {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="estado">Estado</Label>
                <select
                    id="estado"
                    className={claseSelect}
                    value={data.estado}
                    onChange={(e) => setData('estado', e.target.value)}
                >
                    <option value="activo">Activo</option>
                    <option value="suspendido">Suspendido</option>
                    <option value="inactivo">Inactivo</option>
                </select>
                {errors.estado && <p className="text-sm text-red-500">{errors.estado}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="rol">Rol</Label>
                <select
                    id="rol"
                    className={claseSelect}
                    value={data.rol}
                    onChange={(e) => setData('rol', e.target.value)}
                >
                    {roles.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                {errors.rol && <p className="text-sm text-red-500">{errors.rol}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">
                    Contraseña{usuario?.id ? ' (déjala vacía para no cambiarla)' : ''}
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex gap-2">
                <Button type="submit" disabled={processing}>
                    Guardar
                </Button>
                <Button asChild variant="outline">
                    <Link href="/usuarios">Cancelar</Link>
                </Button>
            </div>
        </form>
    );
}