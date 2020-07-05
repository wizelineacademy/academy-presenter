import React from 'react';
import styled from 'styled-components';
import {AppNavbar} from "./navigation";
import MdHome from 'react-ionicons/lib/MdHome';
import MdSchool from 'react-ionicons/lib/MdSchool';

const DashboardContainer = styled.div`
    max-height: calc(100vh - 56px);
`

const DashboardBody = styled.div`
    min-height: calc(100vh - 56px);
`

const UserMenu = () => {
    const classNameMenu = 'hover:shadow-inner w-full px-4 py-2 text-gray-800 text-left flex items-center hover:bg-gray-200 cursor-pointer';

    return(
        <div className="w-1/5 flex flex-col py-4">
            <div className={classNameMenu}>
                <MdHome className="mr-1"/><span className="ml-2">Agenda</span>
            </div>
            <div className={classNameMenu}>
                <MdSchool className="mr-1"/><span className="ml-2">Courses</span>
            </div>
        </div>
    );
}

export const Layout = ({children, withMenu = false}) => {
    const containerClasses = withMenu ? 'w-4/5 flex bg-gray-200 p-5 overflow-auto' : 'container mx-auto mt-4';
    return (
        <div className="w-100">
            <AppNavbar />
            <div className="w-full">
                <DashboardContainer className="flex">
                    {withMenu && <UserMenu />}
                    <DashboardBody className={containerClasses}>
                        {children}
                    </DashboardBody>
                </DashboardContainer>
            </div>
        </div>
    );
}

export default Layout;
