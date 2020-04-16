export const Loader = ({isLoading}) => {
    if (!isLoading) {
        return null;
    }
    return <progress className="progress is-info is-small" max="100">60%</progress>
};
