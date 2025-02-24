import { useEffect, useState } from 'react';
import GameItem from './GameItem'

export default function GamesList({globalNumber}){
    
    const [bg, setBg] = useState(useState(() => localStorage.getItem('activeBg') || '#ffffff'))
    const [items] = useState([
        <GameItem globalNumber={globalNumber} setBg={setBg} />,
        <GameItem globalNumber={globalNumber} setBg={setBg} />,
    ])
    const [loopItems, setLoopItems] = useState([]);

    useEffect(() => {
        const storedBg = localStorage.getItem('activeBg');
        if (storedBg) {
          setBg(storedBg);
        }
      }, []);      

    useEffect(() => {
        const clonedItems = [ ...items.slice(-items.length), ...items, ...items.slice(0, items.length), ];
        setLoopItems(clonedItems);

        setTimeout(() => document.querySelectorAll('button[data-id]')[7].click(),300)
  }, [items]);    

    return(
        <div className='h-dvh max-h-dvh grid items-center [background-image:var(--bg)] !bg-cover duration-200 w-full overflow-hidden
                        before:content-[""] before:opacity-80 before:z-9 before:bg-[linear-gradient(to_right,#55aec7,#0000,#0000,#d58a7d)] before:absolute before:w-full before:h-full         
                        after:absolute after:bg-black/55 after:w-full after:h-screen after:z-0 after:left-0 after:top-0 ' style={{'--bg':`url(${bg})`}}>
            
            <div className="flex gap-6 w-auto h-auto after:content-[''] snap-mandatory z-40 sm:scroll-pl-24 scroll-pl-6 cl:px-20 px-10 [&::-webkit-scrollbar]:hidden overflow-x-scroll py-12
                    [&:has(:not(div.ativo))_.ativo_.infos]:flex 
                    [&:has(:not(div.ativo))_.ativo]:h-auto
                    [&:has(:not(div.ativo))_.ativo]:w-auto
                    [&:has(:not(div.ativo))_.ativo]:mr-0
                    [&:has(:not(div.ativo))_.ativo]:overflow-visible
                    [&:has(:not(div.ativo))_.ativo_.image]:overflow-visible
                    [&:has(:not(div.ativo))_.ativo]:max-w-[323px]
                    [&:has(:not(div.ativo))_.ativo]:max-h-[420px]
                    [&:has(:not(div.ativo))_.ativo]:min-w-[323px]
                    [&:has(:not(div.ativo))_.ativo]:min-h-[420px]
                    [&:has(:not(div.ativo))_.ativo_[data-foto]]:min-w-[323px]
                    [&:has(:not(div.ativo))_.ativo_[data-foto]]:min-h-[420px]
                    [&:has(:not(div.ativo))_.ativo]:z-20
                    [&:has(:not(div.ativo))_.ativo]:self-center
                    [&:has(:not(div.ativo))_.ativo_.image]:outline-[2px]
                    [&:has(:not(div.ativo))_.ativo_[data-foto]]:p-[.3rem]
                    [&:has(:not(div.ativo))_.ativo_.image]:outline-[#0efaff]
                    [&:has(:not(div.ativo))_.ativo_.image]:-outline-offset-[4px]
                    [&:has(:not(div.ativo))_.ativo_a]:block
                    ">
                    {loopItems.map((item, index) => (
                        <GameItem globalNumber={globalNumber} setBg={setBg} />, <GameItem globalNumber={globalNumber} setBg={setBg} key={index}/>
                    ))}
 
            </div>
        </div>
    )
}