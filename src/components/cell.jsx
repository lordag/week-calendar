const Cell = ({values}) => {
    if (!values) return <></>;
    return (
        <div className="cell">
            <span className="subject">{values.subject.toUpperCase()}</span>
            <span className="professor">{values.professor}</span>
        </div>
    )
}

export default Cell;