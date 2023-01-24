import { Variedad } from '../models/variedad'
import { Grado } from '../models/grado'
import { ImagenProducto } from './imagen-producto';

export class Producto {
    id: string | undefined;
    nombre: string | undefined;
    especie: string | undefined;
    urlarchivo: ImagenProducto | undefined;
    variedades: Variedad[] | undefined;    
    grados: Grado[] | undefined;    
}
