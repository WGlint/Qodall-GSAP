import './Waiting.css'


import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin, ExpoScaleEase, RoughEase, SlowMo);

export default function Waiting()
{
    const main = useRef()
    const texte = useRef()
    const TexteLine = useRef()
    const Carre = useRef()

    const ListWord = [
        "Website coming soon...",
        "Site bientôt disponible..."
    ]

    const Curseur = () => 
    {
        texte.current.style.opacity = 1
        gsap.to(texte.current, 
        {
            opacity: 0,
            repeat: -1,
            ease: "power2.inOut"

        })

        gsap.to(Carre.current,
            {
                rotate: 200,
                repeat: -1,
                duration: 8,
                yoyo: true,
                ease: "power2.inOut"
            })

        let MasterTL = gsap.timeline({ repeat: -1 })

        ListWord.forEach(word => 
            {
                let TL = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1})
                TL.to(TexteLine.current, 
                    {
                        duration: 3,
                        text: word
                    })
                MasterTL.add(TL)
            })
    }

    useLayoutEffect(() =>
    {
        let ctx = gsap.context(() => 
        {
            gsap.timeline().to(".SquareC", 
            {
                width: 50,
                height: 50,
                rotation: 405,
                duration: 1,
                delay: 1
            }).to(
                ".CircleTL", 
                {
                    width: 20,
                    height: 20,
                    duration: 0.2,
                    ease: "circ"
                }
            ).to(
                ".BorderT",
                {
                    width: 75,
                    duration: 0.2
                },
                "<"
            ).to(
                ".CircleTR", 
                {
                    width: 20,
                    height: 20,
                    duration: 0.2
                }
            ).to(
                ".BorderL",
                {
                    height: 85,
                    duration: 0.2,
                    ease: "circ"
                },
                ">"
            ).to(
                ".CircleBL", 
                {
                    width: 20,
                    height: 20,
                    duration: 0.2
                }
            ).to(
                ".BorderB",
                {
                    width: 75,
                    duration: 0.2,
                    ease: "circ"
                },
                ">"
            ).to(
                ".CircleBR", 
                {
                    width: 20,
                    height: 20,
                    duration: 0.2
                }
            ).to(
                ".BorderR",
                {
                    height: 85,
                    duration: 0.2,
                    ease: "circ",
                    onComplete: () => 
                    {
                        Curseur()
                    }
                },
                ">"
            )
        },main)

        return () => ctx.revert()
    }, [])

    return <>
        <div className='Logo' ref={main} >
            <div className='SquareC' ref={Carre} ></div>
            <div className='CircleTL' ></div>
            <div className='CircleTR' ></div>
            <div className='CircleBL' ></div>
            <div className='CircleBR' ></div>
            <div className='BorderT'></div>
            <div className='BorderR'></div>
            <div className='BorderB'></div>
            <div className='BorderL'></div>
        </div>
        <div className='Texte' >
            <span className='curseur' ref={TexteLine} ></span>
            <span className='Txtcurseur' ref={texte} >_</span>
        </div>
    </>
}