type CloseButtonProps = {
    title?:string,
    onClick:()=>void
}
const CloseButton = ({title,onClick}:CloseButtonProps) => {

    return (
        <button
            title={title}
            onClick={onClick}
            className=" tbox-closer tbox-absolute tbox-top-3 tbox-right-4">
        </button>
        )
}
export default CloseButton