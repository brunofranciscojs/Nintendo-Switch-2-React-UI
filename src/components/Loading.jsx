export default function Loading(){
    const loadSpin = `<svg width="20px" height="20px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5" stroke-width="1.2"/> </svg>`
    return <span dangerouslySetInnerHTML={{__html:loadSpin}} 
                className='animate-spin [&>svg_path]:fill-none [&>svg_*]:stroke-gray-400 h-5 w-5 [scale:3] z-10 absolute left-1/2 top-[50%] [translate:-50%_50%]'></span>

}