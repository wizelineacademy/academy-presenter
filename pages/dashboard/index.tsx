import Layout from "../../components/dashboard-layout";
import Link from "next/link";

export default () => {
    return (
        <Layout>
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            My courses
                        </h1>
                        <h2 className="subtitle">
                            Create, edit, publish and un-publish any course.
                        </h2>
                    </div>
                    <div className="is-pulled-right">
                        <Link href="/dashboard/course">
                            <button className="button is-link is-light">Create a new course</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">WIP...</section>
        </Layout>
    )
}
