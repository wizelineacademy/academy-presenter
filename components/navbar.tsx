import {useContext, useState} from 'react';
import cx from 'classnames';
import Link from 'next/link';
import {ShowIf} from "./show-if";
import {ServiceContext} from "../context/service.context";

type NavbarProps = {
    isAdmin?: boolean;
}

export const Navbar = ({isAdmin}: NavbarProps) => {
    const [isActive, setActive] = useState(false);
    const {userSession: user} = useContext(ServiceContext);
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
                <ShowIf condition={user.isLoggedIn && isAdmin}>
                    <div className="navbar-start">
                        <Link href="/dashboard">
                            <a className="navbar-item">
                                Dashboard
                            </a>
                        </Link>
                    </div>
                </ShowIf>
                {!user.isLoggedIn && (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link href="/login">
                                    <a className="button is-primary">
                                        Log in
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {user.isLoggedIn && (
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <figure className="image is-32x32">
                                <img className="is-rounded" src={user.current.photoURL} />
                            </figure>
                            <div className="box is-shadowless">
                                {user.current.displayName}
                            </div>
                        </div>
                        <div className="navbar-item">
                            <Link href="/logout">
                                <a className="is-link">
                                    Log out
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
