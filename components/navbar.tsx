import {useState} from 'react';
import cx from 'classnames';
import Link from 'next/link';
import {ShowIf} from "./show-if";

type NavbarProps = {
    isAdmin?: boolean;
}

export const Navbar = ({isAdmin}: NavbarProps) => {
    const [isActive, setActive] = useState(false);
    const toggleMenu = () => setActive(!isActive);

    const hamburgerMenuClasses = cx('navbar-burger burger', {'is-active': isActive});

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    Wizeline Academy
                </a>

                <a role="button"
                   className={hamburgerMenuClasses}
                   aria-label="menu"
                   aria-expanded="false"
                   data-target="navigation-menu"
                   onClick={toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navigation-menu" className="navbar-menu">
                <ShowIf condition={isAdmin}>
                    <div className="navbar-start">
                        <Link href="/dashboard">
                            <a className="navbar-item">
                                Dashboard
                            </a>
                        </Link>
                    </div>
                </ShowIf>
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
    );
}
