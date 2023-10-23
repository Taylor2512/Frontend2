export interface PersonaDto extends PersonaRequestDto {
    id: number;
}
export interface Sort {
    selector: string;
    desc: boolean;
}

export interface PersonaRequest extends PaginatedRequest,PersonaRequestDto {
 
}
export interface PersonaRequestDto  {
     username?: string | null;
    cedula?: string | null;
    firstName?: string | null;
    midleName?: string | null;
    lastName?: string | null;
    lastNameSecond?: string | null;
    razonSocial?: string | null;
}

export interface PaginatedRequest {
    offset?: number;
    take?: number;
    sort?: string | null;
}