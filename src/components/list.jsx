const List = ({elems, title}) => {
    return (
        <div className="list">
            <div className="list__header">
                <div>{title}</div>
                <div>Hours</div>
            </div>
            <div className="list__items">
                {elems.map((elem) => {
                    return <div key={elem.name.toLowerCase()} className="list__items__elem">
                        <div className="list__items__elem__title">{elem.name}</div>
                        <div className="list__items__elem__count">{elem.count}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default List;