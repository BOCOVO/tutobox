type ButtonProps = {
    children?: string,
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    loading?: boolean
}
const Button = ({ children = "", onClick, className = "", loading, disabled }: ButtonProps) => {

    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className={`tbox-btn tbox-px-5 tbox-py-2 tbox-font-semibold disabled:tbox-cursor-not-allowed disabled:tbox-opacity-50 ${className}`}>
            {loading
                ? <div class="loader"></div>
                :children
            }
        </button>
    )
}

export default Button