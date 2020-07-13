import React from 'react';
import styled from 'styled-components';
import {useRouter} from "next/router";
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
    const router = useRouter();
    const getClasses = (isActive) => {
        const classNameMenu = ['hover:shadow-inner w-full px-4 py-2 text-gray-800 text-left flex items-center hover:bg-gray-200 cursor-pointer'];
        if (isActive) {
            classNameMenu.push('bg-gray-200');
            classNameMenu.push('text-blue-600');
            classNameMenu.push('shadow-inner');
        }
        return classNameMenu.join(' ');
    }

    return(
        <div className="w-1/5 flex flex-col py-4">
            <div className={getClasses(router.pathname.includes('admin/dashboard'))}>
                <MdHome className="mr-1"/><span className="ml-2">Agenda</span>
            </div>
            <div className={getClasses(router.pathname.includes('admin/courses'))}>
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
