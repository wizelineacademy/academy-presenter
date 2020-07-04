import React from 'react';
import styled from 'styled-components';
import { Title }from './withReveal';

const Divider = styled.div`
    background: var(--tertiary-color-two, yellow);
    height: 10px;
    width: 100%;
`;

const UserHandler = styled.a`
    text-transform: none;
    color: pink;
    cursor: pointer;
`;

/* const SlideTitle = styled.h1`
 *     color: var(--tertiary-color-one, pink) !important;
 *     font-size: clamp(4rem, 100vw, 5.125rem) !important;
 * `; */

export const TitleSlideOptionOne = ({title, author}) => {
    return (
        <section data-state="title-slide-option-one" className="title-slide-option-one flex">
            <div className="w-50">
                <Title className="text-5xl">{title}</Title>
                <Divider />
                <h3>{author} - <UserHandler>@bit-dragon</UserHandler></h3>
            </div>
            <div className="flex-grow-1">
            </div>
        </section>
    );
}
