import {Layout} from "@components/dashboard-layout";
import {CourseForm} from "@components/forms/course.form";

export default () => {
    return (
        <Layout withMenu={true} >
            <CourseForm />
        </Layout>
    );
}
