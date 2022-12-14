import React, { useRef, useEffect } from 'react'

let i = 0; 
const Canvas = props => {
  
  const { renderer, spritesheet } = props;
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;
    const render = () => {
      renderer(context, spritesheet);
      animationFrameId = window.requestAnimationFrame(render);
    }
    
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [renderer])
  return (<canvas ref={canvasRef}/>);
}

export default Canvas