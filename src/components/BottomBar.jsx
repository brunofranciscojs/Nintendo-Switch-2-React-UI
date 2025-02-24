import React, { useEffect, useState } from "react"
import Notification from './Notification';
import ActionButton from "./ActionButton";
import useLocalStorage from './useLocalStorage';

export default function BottomBar({globalNumber}){
    const joystick = 
    `<svg height="40px" width="40px" viewBox="0 0 58.189 58.189" xml:space="preserve"> 
        <path style="fill:black;" d="M29.095,39.268h9.446c1.701,0,3.346,0.609,4.638,1.716l9.128,7.828 c0.611,0.524,1.505,0.614,2.184,0.183c9.496-6.01-2.022-29.728-4.305-34.034c-0.242-0.457-0.641-2.936-1.126-3.113l-7.676-2.791 c-0.673-0.245-1.422-0.155-2.017,0.242c0,0-2.164,1.383-2.649,1.383h-8.425h-6.549c-0.485,0-2.921-1.383-2.921-1.383 c-0.596-0.397-1.345-0.487-2.017-0.242L9.13,11.848c-0.486,0.177-0.884,2.656-1.126,3.113C5.721,19.267-5.797,42.985,3.699,48.995 c0.68,0.43,1.574,0.34,2.184-0.183l9.128-7.828c1.292-1.107,2.937-1.716,4.638-1.716H29.095z"/> 
        <circle style="fill:white;" cx="36.786" cy="30.268" r="4"/> <circle style="fill:white;" cx="13.786" cy="20.268" r="4"/> 
        <circle style="fill:white;" cx="43.786" cy="16.268" r="2"/> <circle style="fill:white;" cx="39.786" cy="20.268" r="2"/> 
        <circle style="fill:white;" cx="47.786" cy="20.268" r="2"/> <circle style="fill:white;" cx="43.786" cy="24.268" r="2"/> 
        <path style="fill:white;" d="M27.286,27.921H24v-3.286c0-0.395-0.32-0.714-0.714-0.714h-2.571c-0.395,0-0.714,0.32-0.714,0.714 v3.286h-3.286c-0.395,0-0.714,0.32-0.714,0.714v2.571c0,0.395,0.32,0.714,0.714,0.714H20v3.286c0,0.395,0.32,0.714,0.714,0.714 h2.571c0.395,0,0.714-0.32,0.714-0.714v-3.286h3.286c0.395,0,0.714-0.32,0.714-0.714v-2.571C28,28.241,27.68,27.921,27.286,27.921z" /> 
    </svg>`
    const gamepad = `<svg height="50px" width="50px" viewBox="0 0 256 256"> <g><g><g><path fill="black" d="M38.5,76.3c-4,0.6-9.8,2.8-13.3,5.1c-3.8,2.5-8.9,7.9-11,11.7c-1,1.7-2.3,4.7-3,6.6l-1.2,3.6v24.2c0,21.6,0.1,24.6,0.8,27.2c3.5,13,14.9,23,28.3,24.9c5,0.7,172.9,0.7,177.9,0c13.4-1.8,24.8-11.9,28.3-24.9c0.7-2.7,0.8-5.6,0.8-26.8c0-21.2-0.1-24.1-0.8-26.8c-3.5-13-14.9-23-28.3-24.9C212.5,75.6,42.8,75.7,38.5,76.3z M187.6,86.5c2.4,0.8,4.6,2.7,5.5,4.8c0.8,1.8,0.9,3.7,0.9,36.3c0,32.6,0,34.5-0.9,36.3c-1,2.1-3.1,3.9-5.5,4.8c-2.2,0.7-117,0.7-119.2,0c-2.4-0.8-4.5-2.5-5.5-4.6c-0.9-1.8-0.9-2.8-0.9-36.5c0-33.7,0-34.7,0.9-36.5c1-1.9,3.1-3.7,5.3-4.5C70.2,85.8,185.5,85.8,187.6,86.5z M41.7,103.6l0.1,5.2l5.2,0.1l5.2,0.1v4.1v4.1l-5.2,0.1l-5.2,0.1l-0.1,5.2l-0.1,5.2l-4.2-0.1l-4.2-0.1l-0.1-5.2l-0.1-5.2h-5h-5.1v-4.2V109h5.1h5.1v-5c0-2.8,0.1-5.2,0.3-5.3c0.1-0.2,2.1-0.3,4.3-0.3h4.1L41.7,103.6z M221.9,100.5c0.5,0.5,0.7,1.6,0.7,3.6c0,3.2-0.6,4.5-2.8,5.7c-1.3,0.6-1.5,0.6-2.9-0.1c-1.9-1.2-2.6-2.6-2.6-5.4c0-3.5,0.8-4.4,4.2-4.4C220.4,99.8,221.5,100,221.9,100.5z M212.8,112c1.9,1.9,2,3.2,0.2,4.9c-1.2,1.2-1.6,1.3-4.9,1.3c-3.4,0-3.6,0-4-1.2c-0.7-1.8-0.6-4.5,0.3-5.6c0.6-0.9,1.1-1,3.7-1C211,110.4,211.3,110.5,212.8,112z M232.6,111.4c0.8,1.2,1,4.6,0.3,6c-0.4,0.7-1,0.9-3.7,0.9c-3.7,0-4.8-0.4-5.7-2.4c-0.9-1.7-0.6-2.8,1.2-4.3c1.2-1,1.9-1.2,4.3-1.2C231.5,110.4,232,110.6,232.6,111.4z M221.1,120.3c1.4,1.4,1.6,1.8,1.6,4.3c0,3.9-0.6,4.5-4.2,4.5s-4.2-0.6-4.2-4.5c0-2.5,0.1-2.9,1.6-4.3c0.9-0.9,2-1.6,2.6-1.6S220.2,119.4,221.1,120.3z M46.9,143.2c2,1.4,4,5,4,7.3c0,3.3-2.7,7.2-5.7,8.3c-3.4,1.3-7.8,0.1-10.2-2.7c-1.2-1.3-2.2-4-2.2-5.5c0-2.9,2.6-6.9,5.3-8.2C40.3,141.5,44.9,141.9,46.9,143.2z M217.7,142.5c2.7,1.1,5.4,5.1,5.4,8.1c0,1.6-1,4.2-2.2,5.5c-2.4,2.8-6.8,4-10.2,2.7c-3-1.1-5.7-5-5.7-8.3c0-3.2,2.4-6.8,5.3-8.1C212.2,141.7,215.8,141.6,217.7,142.5z"/></g></g></g> </svg>`
    const music = `<svg width="15" heigth="32" viewBox="0 0 256 256" fill="none"> <g><g><g><path fill="white" d="M112.5,90c0,71-0.1,80.4-0.8,80.2c-0.4-0.2-2.9-0.4-5.6-0.7c-11.9-0.9-27.1,3.5-37.5,10.9c-14.5,10.4-22.2,26.7-19,40.5c2.7,11.4,11.9,20.2,25.1,23.8c4.4,1.2,15.3,1.6,20.4,0.9c18.4-2.8,34.4-13.9,41.4-28.6c4-8.3,3.8-4.5,3.8-67.4V93l1.3,0.3c0.7,0.2,4.9,2.2,9.4,4.4c21.7,10.6,32.4,21.9,36.8,38.8c2.3,8.7,1.9,23-1.1,35.2l-1,4.4l1.6-1.9c3.1-3.6,8.8-12.7,11.7-18.5c9.1-18.2,10.7-35.8,4.8-53.3c-5.1-15.1-16.2-30-31.3-42.2c-2.8-2.2-11.4-8.2-19-13.3c-7.6-5-16.2-11-19.1-13.3c-6.4-5.1-14.2-13.2-18-18.9c-1.6-2.3-3.1-4.5-3.4-4.8C112.7,9.7,112.5,45.7,112.5,90z"/></g></g></g> </svg>`

    const [gameName, setGameName] = useState(localStorage.getItem('activeGame') || 'Nenhum jogo ativo');

    useEffect(() =>{
        if(localStorage.getItem('activeGame')){
            setGameName(localStorage.getItem('activeGame'))
        }
    },[])
    
    useEffect(() => {
        const interval = setInterval(() => {
            const storedGame = localStorage.getItem('activeGame');
            if (storedGame !== gameName) {
                setGameName(storedGame || '');
            }
        }, 100); 
    
        return () => clearInterval(interval);
    }, [gameName]);

    return(
        <div className="flex pb-12 lg:pb-2 gap-3 lg:justify-between justify-center absolute bottom-0 w-full h-24 z-[99] px-16 items-center flex-col lg:flex-row">
            <div className="flex flex-col justify-center gap-2 items-center">
                <button dangerouslySetInnerHTML={{__html:gamepad}} className="mix-blend-overlay invert"></button>
            </div>

            <span className="text-white text-sm flex items-center"><span dangerouslySetInnerHTML={{__html:music}} className="mr-2"></span> 
                Now Playing: Lorem Ipsum Dolor ({gameName})
            </span>

            <div className="w-5 lg:justify-end justify-center gap-28 flex [&_a:after]:content-[attr(data-action)] [&_a:after]:text-white [&_a:after]:relative [&_a:after]:left-4 pr-12 relative [&_small]:-translate-x-12">
                <ActionButton text={'+'} action={'Options'} className={'rounded-full'}/>
                <ActionButton text={'C'} action={'connect'} />
            </div>
        </div>
    )
}