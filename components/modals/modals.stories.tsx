import React, {useRef} from 'react';
import {Modal} from './Modal';
import {Button} from '../Button/Button';
import {TopicModal} from './topic.modal';

export default {
    title: 'Components/Modal',
    component: Modal,
};


export const modal = () => {
    const modalRef = useRef();
    const modalTrigger = () => modalRef.current.open()

    return (
        <div className="p-3 text-center">
            <Button variant="primary" onClick={modalTrigger}>Show modal</Button>
            <Modal isDeleting={false} ref={modalRef} >
                <p>
                    Pulvinar neque laoreet suspendisse interdum consectetur libero, id faucibus. Facilisi cras fermentum, odio eu feugiat pretium, nibh ipsum consequat nisl, vel pretium lectus quam id leo in vitae turpis massa!
                </p>
            </Modal>
        </div>
    )
}

export const topicModal = () => {
    const modalRef = useRef();
    const modalTrigger = () => modalRef.current.open()

    return (
        <div className="p-3 text-center">
            <Button variant="primary" onClick={modalTrigger}>Show modal</Button>
            <TopicModal ref={modalRef}/>
        </div>
    );
}


modal.story = {
    name: 'Base',
};
