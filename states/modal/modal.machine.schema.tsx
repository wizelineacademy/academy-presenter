export interface ModalStateMachine {
    states: {
        visible: {},
        hidden: {}
    }
}

export interface ModalContext {
    name: string,
    type: string,
    entity: any,
}
