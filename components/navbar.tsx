import React, {useContext, useState} from 'react';
import cx from 'classnames';
import Link from 'next/link';
import {ShowIf} from "./show-if";

type NavbarProps = {
    isAdmin?: boolean;
    isActive?: boolean;
    user?: any;
    onHamburgerClick: any;
}

export const Navbar = ({isAdmin, isActive, user, onHamburgerClick}: NavbarProps) => {
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
                   onClick={onHamburgerClick}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navigation-menu" className="navbar-menu">
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
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                <figure className="image is-32x32">
                                    <img className="is-rounded" src={user.current.photoURL} />
                                </figure>
                            </a>
                            <div className="navbar-dropdown">
                                <Link href="/admin/dashboard">
                                    <a className="navbar-item">Dashboard</a>
                                </Link>

                                <hr className="navbar-divider"/>
                                <Link href="/logout">
                                    <a className="navbar-item">Log out</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
