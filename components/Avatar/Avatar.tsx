import React from 'react';

type AvatarProps = {
    user?: any;
    onClick?: any;
}

export const Avatar = ({ user, onClick }: AvatarProps) => {
    let imageSrc = "http://placekitten.com/g/200/300";

    if (user && user.current) {
        imageSrc = user.current.photoURL;
    }

    if (onClick) {
        return (
            <button className="block h-8 w-8 rounded-full overflow-hidden" onClick={onClick}>
                <img className="h-full w-full object-cover" src={imageSrc} />
            </button>
        );
    }

    return (
        <div className="block h-8 w-8 rounded-full overflow-hidden">
            <img className="h-full w-full object-cover" src={imageSrc} />
        </div>
    );
};
