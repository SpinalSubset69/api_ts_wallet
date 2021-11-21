import { RequiredParameter } from "./application.exception";

//Clase para provocar una execepcion en caso de que falte alguna propiedad en el request.body
export function RequiredParam(param:string){
    throw new RequiredParameter(param);
}