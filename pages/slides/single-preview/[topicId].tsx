import {useContext, useEffect} from 'react';
import {ServiceContext} from '../../../context/service.context';
import {useRouter} from "next/router";
import {NextRouter} from "next/dist/next-server/lib/router/router";
import {ContentSlide} from "../../../components/slides/content-slide";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../../../components/layout'), {ssr: false});

export default function () {
    const {userSession} = useContext(ServiceContext);
    const router: NextRouter = useRouter();

    useEffect(() => {
        console.log('[QUERIES]', router.query);
        console.log('userSession', userSession.isLoggedIn);
    }, [router])

    return (
        <>
            <Layout>
                <ContentSlide title={'Promise'} variant={3}>
                    <div className="content has-text-left">
                        <ul>
                            <li>Test 1</li>
                            <li>Test 2</li>
                        </ul>
                    </div>
                </ContentSlide>
            </Layout>
        </>
    );
}
