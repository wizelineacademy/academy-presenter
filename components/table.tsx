import {Lesson} from "../domain/lesson";
import cx from 'classnames';
import Link from "next/link";

type TableProps = {
    isLoading: boolean;
    lessons: Lesson[];
}

export const Table = ({isLoading, lessons}: TableProps) => {

    if (isLoading || lessons.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <table className="table is-fullwidth">
                <thead>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Title</th>
                    <th>Speaker</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Title</th>
                    <th>Speaker</th>
                    <th>Duration</th>
                </tr>
                </tfoot>
                <tbody>
                {lessons.map((lesson: Lesson) => (
                    <tr key={lesson.id} className={cx({'is-selected': lesson.active})}>
                        <th>{lesson.position}</th>
                        <td>
                            <Link href={`/lessons/${lesson.id}`} >
                                <a>{lesson.name}</a>
                            </Link>
                        </td>
                        <td>Jorge Garcia</td>
                        <td>1hr</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );

};
