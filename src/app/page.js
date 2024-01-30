'use client';
import styles from "./page.module.scss";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Home() {

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const options = {stifness: 70, damping: 50, mass: 1}
    const smoothMouse = {
        x: useSpring(mouse.x, options),
        y: useSpring(mouse.y, options)
    }

    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX / window.innerWidth)
        mouse.y.set(clientY / window.innerHeight)
    }

    const color1 = useTransform(smoothMouse.y, [0, 1], ["#facb0e", "#fa0e0e"])
    const color2 = useTransform(smoothMouse.y, [0, 1], ["#f06ba8", "#6b72f0"])
    const color3 = useTransform(smoothMouse.x, [0, 1], ["#78bae6", "#e6a678"])
    const background = useMotionTemplate`linear-gradient( 255deg, ${color1}, ${color2} 30%, ${color3} 65%, #fff)`

    return (
        <main onMouseMove={(e) => {manageMouseMove(e)}} className={styles.main}>
            <motion.div 
                className={styles.gradient}
                style={{background: background}}
            >
            </motion.div>
            <h1>Gradient On Mouse Move</h1>
        </main>
    );
}
