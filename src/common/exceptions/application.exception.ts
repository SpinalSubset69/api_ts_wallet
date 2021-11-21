export class ApplicationException extends Error{
    constructor(message: string = 'An unexpected error ocurred.'){
        super(message);
    };
}

export class NotFoundException extends Error{
    constructor(param:string){
        super(`${param} not found`);
    }
}

export class RequiredParameter extends Error{
    constructor(param: string){
        super(`${param} can not be null or undefined`);
    }
}

export class InvalidPropertyError extends Error{
    constructor(msg:string){
        super(msg);
    }
}