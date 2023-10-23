export interface OperationResult {
    error: string;
    message: string;
    statusCode: number; // Aquí almacenamos el código de estado HTTP como un número
    success: boolean;
}

export interface OperationResultDo<T> extends OperationResult {
    result: T;
}

export interface OperationResultList<T> extends OperationResult {
    result: T[];
    totalPages:number;
    pageNumber:number;
    length:number;
    hasPrevious:number;
    hasNext:number;
 }
