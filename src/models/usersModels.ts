export interface LoginData {
    username:string;
    password?: string;
}

export interface LoginResponse {
    message: string;
    token? : string;
    userData?: LoginData;
}