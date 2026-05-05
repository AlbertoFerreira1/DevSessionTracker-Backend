export interface LoginData {
    username:string;
    password?: string;
    id?: number;
}

export interface LoginResponse {
    message: string;
    token? : string;
    userData?: LoginData;
}