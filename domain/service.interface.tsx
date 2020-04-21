export interface ServiceInterface {
    find: (id: string) => void;
    getAll: (id?: string) => void;
    save: (value: any) => void;
}
