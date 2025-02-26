import React, { useEffect, useState } from 'react';
import Notification from './Notification';

const icons = [{
    news: `<svg width="30" heigth="32" fill="#fff" viewBox="0 0 32 32"><g id="SVGRepo_bgCarrier" stroke="white" stroke-width="20"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.901 32h4.901c4.5 0 8.198-3.698 8.198-8.198v-15.604c0-4.5-3.698-8.198-8.198-8.198h-5c-0.099 0-0.203 0.099-0.203 0.198v31.604c0 0.099 0.099 0.198 0.302 0.198zM25 14.401c1.802 0 3.198 1.5 3.198 3.198 0 1.802-1.5 3.198-3.198 3.198-1.802 0-3.198-1.396-3.198-3.198-0.104-1.797 1.396-3.198 3.198-3.198zM15.198 0h-7c-4.5 0-8.198 3.698-8.198 8.198v15.604c0 4.5 3.698 8.198 8.198 8.198h7c0.099 0 0.203-0.099 0.203-0.198v-31.604c0-0.099-0.099-0.198-0.203-0.198zM12.901 29.401h-4.703c-3.099 0-5.599-2.5-5.599-5.599v-15.604c0-3.099 2.5-5.599 5.599-5.599h4.604zM5 9.599c0 1.698 1.302 3 3 3s3-1.302 3-3c0-1.698-1.302-3-3-3s-3 1.302-3 3z"></path> </g></svg>`,
    music:`<svg width="40" heigth="32" viewBox="0 0 256 256" fill="none"> <g><g><g><path stroke-width="20" stroke="#c15f68" fill="none" d="M112.5,90c0,71-0.1,80.4-0.8,80.2c-0.4-0.2-2.9-0.4-5.6-0.7c-11.9-0.9-27.1,3.5-37.5,10.9c-14.5,10.4-22.2,26.7-19,40.5c2.7,11.4,11.9,20.2,25.1,23.8c4.4,1.2,15.3,1.6,20.4,0.9c18.4-2.8,34.4-13.9,41.4-28.6c4-8.3,3.8-4.5,3.8-67.4V93l1.3,0.3c0.7,0.2,4.9,2.2,9.4,4.4c21.7,10.6,32.4,21.9,36.8,38.8c2.3,8.7,1.9,23-1.1,35.2l-1,4.4l1.6-1.9c3.1-3.6,8.8-12.7,11.7-18.5c9.1-18.2,10.7-35.8,4.8-53.3c-5.1-15.1-16.2-30-31.3-42.2c-2.8-2.2-11.4-8.2-19-13.3c-7.6-5-16.2-11-19.1-13.3c-6.4-5.1-14.2-13.2-18-18.9c-1.6-2.3-3.1-4.5-3.4-4.8C112.7,9.7,112.5,45.7,112.5,90z"/></g></g></g> </svg>`,
    store: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.83094 10.9091L3.19457 28.3637H28.8054L27.1691 10.9091H4.83094ZM29.8182 8.00002H2.18182L0 31.2727H32L29.8182 8.00002Z" fill="#FFBB36"/> <path d="M13.0909 3.63639H18.1818C18.5835 3.63639 18.9091 3.962 18.9091 4.36366V14.5455H21.8182V4.36366C21.8182 2.35535 20.1901 0.727295 18.1818 0.727295H13.0909C11.0826 0.727295 9.45455 2.35535 9.45455 4.36366V14.5455H12.3636V4.36366C12.3636 3.962 12.6892 3.63639 13.0909 3.63639Z" fill="#FFBB36"/> </svg>`,
    gallery: `<svg width="32" height="24" viewBox="0 0 32 24" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M29.0909 3.27274H2.90909V20.7273H29.0909V3.27274ZM0 0.363647V23.6364H32V0.363647H0Z" fill="#19A1FF"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2005 8.66109C16.3046 6.76578 14.3754 5.45456 12.1399 5.45456C9.05016 5.45456 6.54545 7.95926 6.54545 11.049V23.6364H24.7273V16.8671C24.7273 14.3008 22.9993 12.1381 20.6434 11.479C20.1629 11.3446 19.6563 11.2727 19.1329 11.2727C18.6356 11.2727 18.1626 11.3765 17.7343 11.5637V11.049C17.7343 10.1948 17.5428 9.38529 17.2005 8.66109ZM21.8182 20.7273V16.8671C21.8182 15.3841 20.6159 14.1818 19.1329 14.1818C19.044 14.1818 18.9669 14.1998 18.899 14.2294L14.8252 16.0094V11.049C14.8252 9.5659 13.6229 8.36365 12.1399 8.36365C10.6568 8.36365 9.45455 9.5659 9.45455 11.049V20.7273H21.8182Z" fill="#19A1FF"/> </svg>`,
    joycons: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M27.2558 8.74241L22.6274 4.11408L4.11408 22.6274L8.74241 27.2558C10.4465 28.9599 13.2094 28.9599 14.9135 27.2558L27.2558 14.9135C28.9599 13.2094 28.9599 10.4465 27.2558 8.74241ZM22.6274 0L0 22.6274L6.68537 29.3128C9.52555 32.153 14.1304 32.153 16.9706 29.3128L29.3128 16.9706C32.153 14.1304 32.153 9.52555 29.3128 6.68537L22.6274 0Z" fill="#F0F0F0"/> <path d="M15.4278 22.6274C14.2917 23.7635 12.4498 23.7635 11.3137 22.6274C10.1776 21.4913 10.1776 19.6494 11.3137 18.5133C12.4498 17.3773 14.2917 17.3773 15.4278 18.5133C16.5639 19.6494 16.5639 21.4913 15.4278 22.6274Z" fill="#F0F0F0"/> <path d="M23.6559 12.3422C23.0879 12.9103 22.1669 12.9103 21.5989 12.3422C21.0309 11.7742 21.0309 10.8532 21.5989 10.2852C22.1669 9.71715 23.0879 9.71715 23.6559 10.2852C24.224 10.8532 24.224 11.7742 23.6559 12.3422Z" fill="#F0F0F0"/> <path d="M19.5419 12.3422C18.9738 12.9103 18.0529 12.9103 17.4848 12.3422C16.9168 11.7742 16.9168 10.8532 17.4848 10.2852C18.0529 9.71715 18.9738 9.71715 19.5419 10.2852C20.1099 10.8532 20.1099 11.7742 19.5419 12.3422Z" fill="#F0F0F0"/> <path d="M23.6559 16.4563C23.0879 17.0243 22.1669 17.0243 21.5989 16.4563C21.0309 15.8883 21.0309 14.9673 21.5989 14.3993C22.1669 13.8312 23.0879 13.8312 23.6559 14.3993C24.224 14.9673 24.224 15.8883 23.6559 16.4563Z" fill="#F0F0F0"/> <path d="M19.5419 16.4563C18.9738 17.0243 18.0529 17.0243 17.4848 16.4563C16.9168 15.8883 16.9168 14.9673 17.4848 14.3993C18.0529 13.8312 18.9738 13.8312 19.5419 14.3993C20.1099 14.9673 20.1099 15.8883 19.5419 16.4563Z" fill="#F0F0F0"/> </svg>`,
    settings: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5455 32V26.1818H17.4545V32H14.5455Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5455 5.81819V0H17.4545V5.81819H14.5455Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2442 7.69877L26.2852 3.65774L28.3422 5.71478L24.3012 9.7558L22.2442 7.69877Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6578 26.2852L7.69874 22.2442L9.75578 24.3012L5.71485 28.3422L3.6578 26.2852Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2852 28.3422L22.2442 24.3013L24.3012 22.2442L28.3422 26.2851L26.2852 28.3422Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.69877 9.7558L3.65774 5.71478L5.71478 3.65774L9.7558 7.69877L7.69877 9.7558Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M32 17.4545H26.1818V14.5455H32V17.4545Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.81818 17.4545H0V14.5455H5.81818V17.4545Z" fill="#F0F0F0"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M16 24.7273C20.8199 24.7273 24.7273 20.8199 24.7273 16C24.7273 11.1801 20.8199 7.27273 16 7.27273C11.1801 7.27273 7.27273 11.1801 7.27273 16C7.27273 20.8199 11.1801 24.7273 16 24.7273ZM16 27.6364C22.4266 27.6364 27.6364 22.4266 27.6364 16C27.6364 9.57341 22.4266 4.36364 16 4.36364C9.57341 4.36364 4.36364 9.57341 4.36364 16C4.36364 22.4266 9.57341 27.6364 16 27.6364Z" fill="#F0F0F0"/> </svg>`,
    power:`<svg width="30" height="32" viewBox="0 0 30 32" fill="none"> <path d="M9.90909 3.82488C4.38667 5.8885 0.454546 11.2123 0.454546 17.4545C0.454546 25.4878 6.96677 32 15 32C23.0332 32 29.5455 25.4878 29.5455 17.4545C29.5455 11.2123 25.6133 5.8885 20.0909 3.82488V6.98798C23.9662 8.8764 26.6364 12.8536 26.6364 17.4545C26.6364 23.8811 21.4266 29.0909 15 29.0909C8.57341 29.0909 3.36364 23.8811 3.36364 17.4545C3.36364 12.8536 6.03384 8.8764 9.90909 6.98798V3.82488Z" fill="#F0F0F0"/> <path d="M13.5455 0H16.4545V15.2727H13.5455V0Z" fill="#F0F0F0"/> </svg>`,
}]
const boltIcon = `<svg width="20" height="20" viewBox="0 0 512 512" class="iconify iconify--fxemoji" preserveAspectRatio="xMidYMid meet"><path fill="#fff" d="M459.866 218.346l-186.7.701c-4.619.017-7.618-4.861-5.517-8.975L370.845 8.024c3.103-6.075-4.493-11.949-9.592-7.417L39.948 286.141c-4.221 3.751-1.602 10.732 4.045 10.78l170.444 1.457c4.443.038 7.391 4.619 5.583 8.679L133.317 501.73c-2.688 6.035 4.709 11.501 9.689 7.16l320.937-279.725c4.307-3.753 1.637-10.84-4.077-10.819z"></path></svg>`
const wifiIcon = `<svg width="32px" height="32px" viewBox="0 -2 14 14"> <g id="Page-1" stroke="none" stroke-width="1" fill="red" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-303.000000, -3684.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M252.600198,3532.58575 L254,3533.99975 L255.399802,3532.58575 C254.626644,3531.80475 253.373356,3531.80475 252.600198,3532.58575 M249.800594,3529.75775 L251.200396,3531.17175 C252.743742,3529.61175 255.256258,3529.61175 256.800594,3531.17175 L258.200396,3529.75775 C255.880922,3527.41375 252.120068,3527.41375 249.800594,3529.75775 M261,3526.92875 L259.600198,3528.34275 C256.512516,3525.22375 251.488474,3525.22375 248.399802,3528.34275 L247,3526.92875 C250.86579,3523.02375 257.13421,3523.02375 261,3526.92875" id="wifi-[#1012]"> </path> </g> </g> </g> </svg>`

export default function Header ({ globalNumber }){
    const [hora, setHora] = useState('')
 	const [gameName, setGameName] = useState(localStorage.getItem('activeGame') || 'Nenhum jogo ativo');
    
    useEffect(() => {
        const atualizarHora = () => {
          const data = new Date();
          const horaFormatada = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).format(data);
          setHora(horaFormatada);
        };
    
        atualizarHora(); 
        const intervalo = setInterval(atualizarHora, 1000);
    
        return () => clearInterval(intervalo);
      }, []);


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
    
    
    return (
        <nav className=' flex absolute w-full sm:justify-between justify-center items-center px-4 sm:px-20 cl:py-16 py-7 z-50 flex-wrap cl:gap-12 gap-7 [zoom:.7] cl:[zoom:1]'>

                <div className='relative flex gap-5 pr-3 after:content-[attr(data-notification)] min-w-[50px] after:font-semibold after:text-[#0dedd5] after:text-sm after:absolute after:-top-6 after:left-[15%] after:-translate-x-1/2' data-notification={globalNumber}>
                    <img src={`./src/assets/${globalNumber}.png`} draggable="false" width={50} height={50} className='rounded-full border-white border-2 object-contain aspect-square'/>
                    <div >
                        <span className='text-white text-xs block leading-4'>@brunofrancis_js</span> 
                        <span className='text-white text-xs block leading-4'>u/_WindRider</span> 
                        <span className='text-white text-xs block leading-4'>bruno.jsx</span> 
                    </div>
                </div>

                <ul className='backdrop-blur-sm bg-white/20 px-12 py-5 rounded-full flex sm:gap-9 gap-4 flex-row list-none items-center flex-wrap'>
                    {icons.map((iconObj) =>
                        Object.entries(iconObj).map(([name, svg],index) => (
                            <li key={name} className='hover:-translate-y-2 duration-200 relative nth-1:after:content-["ONLINE"] nth-1:after:absolute nth-1:after:-bottom-3 nth-1:after:text-[.6rem] nth-1:after:left-0 nth-1:after:text-white'>
                                <button data-hover={index === 1 && 'Now playing: Lorem ipsum dolor('+gameName+')' } 
                                    tabIndex={-1} dangerouslySetInnerHTML={{ __html: svg }}
                                    className="relative after:content-[attr(data-hover)] after:absolute after:bottom-1 
                                    after:duration-200 after:left-1/2 after:-translate-x-1/2 after:text-white after:text-sm 
                                    after:opacity-0 hover:after:-bottom-7 hover:after:opacity-100 after:w-[900px]"
                                    ></button>
                                
                            </li>
                        ))
                    )}
                </ul>

            <div className='flex items-center gap-8'>
                <time className='text-white font-thin text-3xl leading-none block -translate-y-[.2rem]'>{hora}</time>
                <span dangerouslySetInnerHTML={{__html:wifiIcon}} className='invert'></span>

                <div className='flex gap-5 items-center'>
                    <span className='text-white font-semibold text-3xl leading-none block -translate-y-[.2rem]'>{globalNumber * 10 + '%'}</span>
                    <progress value={globalNumber / 10} title={globalNumber / 10 < .3 ? 'Time to charge' : globalNumber * 10 + '%' } 
                              style={{'--batteryColor': globalNumber / 10 < .3 ? 'red': 'white'}}
                              className='[&::-webkit-progress-value]:bg-(--batteryColor) [&::-moz-progress-bar]:bg-(-batteryColor) after:border-white relative w-5 h-3 after:border-2 after:content-[""] after:absolute after:left-0 after:top-0 after:bg-transparent after:w-full after:h-full after:[scale:1.8_2.4] [WebkitAppearance:none] [appearance:none]'></progress>

                    {globalNumber / 10 < .3 && <span dangerouslySetInnerHTML={{__html:boltIcon}} className='animate-ping'></span>}
                </div>
            </div>
        </nav>
    )
}