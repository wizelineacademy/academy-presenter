export const TitleSlideOptionOne = ({title, author}) => {
    return (
        <section data-state="title-slide-option-one" className="title-slide-option-one flex">
            <div className="w-50">
                <h1>{title}</h1>
                <div className="divider"></div>
                <h3>{author}</h3>
            </div>
            <div className="flex-grow-1">
            </div>
        </section>
    );
}
