const Button = ({label, func, ...props}) => {
    return (
        <button onClick={func} {...props}>{label}</button>
    )
}

export default Button;