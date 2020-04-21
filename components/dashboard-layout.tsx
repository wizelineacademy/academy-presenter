import {Navbar} from "./navbar";

export default ({children}) => {
    return (
        <div className="container">
            <Navbar isAdmin={true}/>
            <div className="container">
                {children}
            </div>
        </div>
    );
}
