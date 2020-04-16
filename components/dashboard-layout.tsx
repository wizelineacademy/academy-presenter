import {useEffect, useState} from 'react';
import cx from 'classnames';
import Link from 'next/link';

export default ({children}) => {
    const [isActive, setActive] = useState(false);
    const toggleMenu = () => {
        setActive(!isActive);
    }

    useEffect(() => {
    });

    const hamburgerMenuClasses = cx('navbar-burger burger', {'is-acttive': isActive});

    return (
        <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        Wizeline Academy
                    </a>

                    <a role="button"
                       className={hamburgerMenuClasses}
                       aria-label="menu"
                       aria-expanded="false"
                       data-target="navbarBasicExample"
                        onClick={toggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="/slides">
                            <a className="navbar-item is-hidden">
                                Go to slides
                            </a>
                        </Link>
                        <Link href="/slides-creator">
                            <a className="navbar-item is-hidden">
                                Slides Builder
                            </a>
                        </Link>
                    </div>

                    <div className="navbar-end is-hidden">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                {children}
            </div>
        </div>
    );
}
