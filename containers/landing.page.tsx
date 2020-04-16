import Layout from "../components/dashboard-layout";
import Link from "next/link";
import Course from "../domain/course";

type CourseTilesProps = {
    courses: Course[];
}

type LandingPageProps = {
    courses: Course[];
    isLoading: boolean;
}

const AncestorTile = ({children}) => (
    <div className="tile is-ancestor">{children}</div>
);

const CourseTiles = ({courses}: CourseTilesProps) => {
    let rows = [];
    const content = [];

    const isNewLine = idx => idx % 3 === 0;
    const hasToWrap = idx => (idx > 0 && isNewLine(idx + 1)) || idx === courses.length -1;

    courses.forEach((currentCourse, idx) => {
        rows.push(
            <div className="tile is-4 is-parent" key={currentCourse.id}>
                <article className="tile is-child notification is-past-lesson">
                    <p className="title">{currentCourse.name}</p>
                    <p className="subtitle">{currentCourse.createdBy}</p>
                </article>
            </div>
        );

        if (hasToWrap(idx)) {
            content.push(<AncestorTile key={`${idx}-${currentCourse.id}`}>{rows}</AncestorTile>);
            rows = [];
        }
    });

    if (courses.length <= 3) {
        content.push(<AncestorTile key={`initial`}>{rows}</AncestorTile>);
    }

    return (
        <>
            {content}
        </>
    )
};

export const LandingPage = ({courses, isLoading}: LandingPageProps) => {
    // We are going to take the first two courses in order to have a correct element placement
    const hasMoreThanTwoCourses = courses.length > 0 && courses.length >= 2;
    const mainCourses = hasMoreThanTwoCourses ? courses.slice(0, 2) : courses;
    const restCourses = hasMoreThanTwoCourses ? courses.slice(2, courses.length) : [];

    return (
        <Layout>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            What do you want to learn today?
                        </h1>
                        <h2 className="subtitle">
                            Select one of the available course
                        </h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-logo">
                            <div className="content">
                                <div className="content">
                                    <img className="logo" src="/assets/Logo.svg" />
                                </div>
                            </div>
                        </article>
                    </div>


                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            {mainCourses.map((course: Course) => (
                                <div className="tile is-parent" key={course.id}>
                                    <Link href={`/courses/${course.id}`}>
                                        <article className="tile is-child notification is-lesson">
                                            <p className="title">{course.name}</p>
                                            <p className="subtitle">{course.duration} min</p>
                                        </article>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <progress className="progress is-info is-small" max="100">60%</progress>
                )}

                <CourseTiles courses={restCourses} />
            </section>
        </Layout>
    );
}
