const Square = ({ children, isSelected, index, updateBoard }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`

    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    )
}
export default Square