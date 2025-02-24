import React, { useEffect, useState } from "react"
import Loading from "./Loading"
import ActionButton from "./ActionButton"
import Notification from "./Notification"

export default function GameItem({globalNumber, setBg}){
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    const imgPath = 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_auto/c_scale,w_1200/v1/'

    
    useEffect(() =>{
        const fetchGames = async () => {
            try {
                const response = await fetch('/src/assets/gamesList.json')
                const data = await response.json();
                setGame(data.rows)

            } catch (error) {
                console.error("Failed to fetch games list", error);
            } finally {
              setTimeout(() =>{
                setLoading(false);
              },300)  
                
            }
      };
      fetchGames()
    },[])

  
    const activeGame = (game) => {
      localStorage.setItem('activeGame', JSON.stringify(game))
    };
    const activeBg = (game) => {
      localStorage.setItem('activeBg', JSON.stringify(game))
      setBg(localStorage.getItem('activeBg'))
    };
    
    const activeSelection = (e, item) =>{
        document.querySelectorAll('[data-id]').forEach(div => div.classList.remove('ativo','game'))
        activeBg(item)
        e.target.closest('[data-id]').classList.add('ativo');
        e.target.scrollIntoView({behavior:'smooth', block: 'nearest', inline: 'start'})
    }

    return(
        game.map((item,index) =>(
                
                <button className="grid items-center self-end min-w-[206px] min-h-[272px] max-w-[206px] max-h-[272px] [transition:width_.2s_ease] game z-30 scroll-ml-10 relative   
                                  after:absolute after:-left-[6rem] after:-top-[41px] after:[scale:.4] [zoom:.7] sm:[zoom:1]"
                        data-id={item.id} key={item.id}
                        data-installed={index % 2 ? true : false}
                        onClick={(e) => ( activeSelection(e, item.cover_art_url), activeGame(item.title) )}
                >
                    {index === globalNumber && < Notification className={`[scale:3]`}/>}

                    <div className="h-auto w-auto gap-5 active duration-200 relative pointer-events-none">
                        <div className="relative z-10 image">
                            {loading ? <Loading /> :
                                    <img src={item.cover_art_url} data-foto="true" className="min-w-[206px] min-h-[272px] object-center object-cover left-0 top-0 [transition:width_.2s_ease]"/>
                            }
                        </div>
    
                        <div className="hidden flex-col gap-2 z-10 items-start infos absolute w-[500px] -right-[530px] top-0 ">
                            <h2 className="text-white text-xl line-clamp-1">{item.title}</h2>
                            
                            <div className="text-white text-base -translate-y-2 flex gap-20 [&_a:after]:content-[attr(data-action)] [&_a:after]:text-white [&_a:after]:relative [&_a:after]:left-4">
                              {(globalNumber * index) * 10} Hours Played
                            </div>

                            <div className="[&_a:after]:content-[attr(data-action)] [&_a:after]:text-white [&_a]:p-0 [&_a]:pl-2.5 [&_a:after]:text-xl [&_a:after]:relative [&_a:after]:left-6">
                              { index === globalNumber  && 
                                  <div className="flex gap-4">
                                    
                                    <img src={`./src/assets/${globalNumber}.png`} className='h-12 h-12 rounded-full object-contain bg-white aspect-square'/>
                                    <div className="flex gap-0 flex-col">
                                      <span className="block text-[#04ed8a]">Sugiro Kimimame sent an invite</span>
                                      <ActionButton text={'Y'} action={'Join'} className={'rounded-full [scale:.7]'}/>
                                    </div>

                                  </div> 
                              }
                            </div>
                        </div>
                        <div className="pt-4 flex gap-44 [&_a:after]:content-[attr(data-action)] [&_a]:pl-2.5 [&_a:after]:text-white [&_a:after]:relative [&_a:after]:left-5 [&_a:after]:text-nowrap">
                            <ActionButton text={'x'} action={'Close Software'} className={'rounded-full hidden'}/>
                            <ActionButton text={'A'} action={'Continue'} className={'rounded-full hidden'}/>
                        </div>
                    </div>
                </button>
              
        ))
    )
}
