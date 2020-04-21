import {useFormik} from "formik";
import * as Yup from 'yup'
import cx from 'classnames';
import Course from "../../domain/course";
import {ShowIf} from "../show-if";
import {useCourses} from "../../states/courses/courses.machine.service";
import {SaveCourse} from "../../states/courses/courses.machine.events";
import {useEffect} from "react";
import {matchPastState} from "../../states/states.utils";
import {useRouter} from "next/router";
import {createhasErrors} from "../modals/modal.utils";

export const CourseForm = () => {
    const [courseState, sendToCourse] = useCourses();
    const router = useRouter();
    const isSaving = courseState.matches('saving');
    const saveBtnClasses = cx('button is-link is-pulled-right', {'is-loading': isSaving});

    useEffect(() => {
        if (matchPastState(courseState, 'saving')) {
            router.push(    `/dashboard/course/${123}`);
        }
    }, [courseState]);

    const courseForm = useFormik({
        initialValues: new Course(),
        validationSchema: Yup.object({
            name: Yup.string().required('A course name is required'),
            summary: Yup.string().required('A summary is required'),
            duration: Yup.number().required('A duration in minutes is required'),
            tech: Yup.string().required('At least one tech stack is required'),
        }),
        onSubmit: (course: Course) => {
            if (course.id) {
                course.updatedAt = Date.now();
            } else {
                course.updatedAt = Date.now();
                course.createdAt = Date.now();
                course.createdBy = 'jorge@wizeline.com';
                course.level = 'Beginner';
            }
            console.log('about to save the course', course);
            sendToCourse(new SaveCourse(course))
        }
    });

    const hasErrors = createhasErrors(courseForm);

    return (
        <section className="section">
            <form onSubmit={courseForm.handleSubmit}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="name">Course Name *</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    placeholder="React crash course"
                                    onChange={courseForm.handleChange}
                                    onBlur={courseForm.handleBlur}
                                    value={courseForm.values.name}
                                />
                            </div>
                            <ShowIf condition={hasErrors('name')}>
                                <p className="help is-danger">
                                    {courseForm.errors.name}
                                </p>
                            </ShowIf>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="summary">Summary *</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                        <textarea
                                            className="textarea"
                                            name="summary"
                                            placeholder="e.g. We should create awesome stuffs"
                                            onChange={courseForm.handleChange}
                                            onBlur={courseForm.handleBlur}
                                            value={courseForm.values.summary || ''}
                                        />
                            </div>
                            <ShowIf condition={hasErrors('summary')}>
                                <p className="help is-danger">
                                    {courseForm.errors.summary}
                                </p>
                            </ShowIf>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="duration">Duration *</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="duration"
                                    placeholder="90"
                                    onChange={courseForm.handleChange}
                                    onBlur={courseForm.handleBlur}
                                    value={courseForm.values.duration}
                                />
                            </div>
                            <ShowIf condition={hasErrors('duration')}>
                                <p className="help is-danger">
                                    {courseForm.errors.duration}
                                </p>
                            </ShowIf>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label" htmlFor="tech">Tech Stack *</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="tech"
                                    placeholder="React, Javascript"
                                    onChange={courseForm.handleChange}
                                    onBlur={courseForm.handleBlur}
                                    value={courseForm.values.tech}
                                />
                            </div>
                            <ShowIf condition={hasErrors('tech')}>
                                <p className="help is-danger">
                                    {courseForm.errors.tech}
                                </p>
                            </ShowIf>
                        </div>
                    </div>
                </div>

                <button className={saveBtnClasses} type="submit">Save</button>
            </form>
        </section>
    );
};
