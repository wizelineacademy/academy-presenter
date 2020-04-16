import {BehaviorSubject} from "rxjs";

export interface ServiceInterface {
    items$: BehaviorSubject<any>;
    isLoading$: BehaviorSubject<boolean>;
    entities$: BehaviorSubject<any>;
    find: (id: string) => void;
    getAll: (id?: string) => void;
    save: (value: any) => void;
}
