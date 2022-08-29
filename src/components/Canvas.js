import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const { draw, spritesheet } = props;
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    let animationFrameId;
    
    const render = () => {
      draw(context, spritesheet);
      animationFrameId = window.requestAnimationFrame(render);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw])
  
  return (<canvas ref={canvasRef}/>);
}

export default Canvas