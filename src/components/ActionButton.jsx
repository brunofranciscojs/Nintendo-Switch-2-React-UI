

export default function ActionButton({action,text, className}){
    return(
        <a tabIndex="-1" className={`${className} w-7 h-7 p-2 bg-white leading-[.6] relative`} data-action={action} >
            {text}
        </a>
    )
}