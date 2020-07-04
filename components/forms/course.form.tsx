import {useFormik} from "formik";
import * as Yup from 'yup'
import cx from 'classnames';
import Course from "../../domain/course";
import {useCourses} from "../../states/courses/courses.machine.service";
import {SaveCourse} from "../../states/courses/courses.machine.events";
import {useEffect} from "react";
import {matchPastState} from "../../states/states.utils";
import {useRouter} from "next/router";
import {createhasErrors} from "../modals/modal.utils";
import {TextField} from '../../components/TextField/TextField';
import {TextArea} from '../../components/TextArea/TextArea';
import {Button} from '../../components/Button/Button';

export const CourseForm = () => {
    const [courseState, sendToCourse] = useCourses();
    const router = useRouter();
    const isSaving = courseState.matches('saving');
    const saveBtnClasses = cx('button is-link is-pulled-right', {'is-loading': isSaving});

    useEffect(() => {
        if (matchPastState(courseState, 'saving')) {
            router.push(`/dashboard/course/${123}`);
        }
    }, [courseState]);

    const courseForm = useFormik({
        initialValues: new Course(),
        validationSchema: Yup.object({
            name: Yup.string().required('Course name is required'),
            summary: Yup.string().required('Summary is required'),
            duration: Yup.number().required('Duration in minutes is required'),
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
        <div className="w-full max-w-lg mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={courseForm.handleSubmit}>
                <TextField
                    label="Course Name *"
                    name="name"
                    placeholder="React Crash Course"
                    onChange={courseForm.handleChange}
                    onBlur={courseForm.handleBlur}
                    value={courseForm.values.name}
                    errors={courseForm.errors.name}
                />
                <TextArea
                    label="Summary *"
                    name="summary"
                    placeholder="e.g. We should create awesome stuffs"
                    onChange={courseForm.handleChange}
                    onBlur={courseForm.handleBlur}
                    value={courseForm.values.summary}
                    errors={courseForm.errors.summary}
                />
                <TextField
                    label="Duration *"
                    placeholder="React Crash Course"
                    name="duration"
                    onChange={courseForm.handleChange}
                    onBlur={courseForm.handleBlur}
                    value={courseForm.values.duration}
                    errors={courseForm.errors.duration}
                    type="number"
                />
                <TextField
                    label="Tech Stack *"
                    placeholder="React, Javascript"
                    name="tech"
                    onChange={courseForm.handleChange}
                    onBlur={courseForm.handleBlur}
                    value={courseForm.values.tech}
                    errors={courseForm.errors.tech}
                    type="number"
                />
                <div className="flex items-center justify-end">
                    <Button variant='primary' type="submit">Save</Button>
                </div>
            </form>
        </div>
    );
};
