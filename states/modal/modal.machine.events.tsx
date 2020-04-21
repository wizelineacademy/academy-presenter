type ModalOptions = {
    name: string;
    type: string;
    entity: any;
}

export class ShowModal {
    readonly type = 'SHOW_MODAL';
    constructor(public modalOptions: ModalOptions) {};
}

export class CloseModal {
    readonly type = 'CLOSE_MODAL';
}

export type ModalMachineEvents = ShowModal | CloseModal;
