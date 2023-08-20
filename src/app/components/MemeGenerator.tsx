"use client";

// MemeGenerator.js
import React, { useRef, useState, useEffect } from 'react';

const MemeGenerator = () => {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('¡AFUERA!');
    const canvasRef = useRef(null);
    const inputContainerRef: any = useRef(null);
    const downloadLinkRef: any = useRef(null);
    const imageRef:any = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            imageRef.current = new window.Image();
            imageRef.current.src = './assets/milei_meme.jpg'; // Ruta de tu imagen
            imageRef.current.onload = updateCanvas;
          }
    }, []);

    const updateCanvas = () => {
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const maxHeight = window.innerHeight * 0.8;
        const aspectRatio = imageRef.current.width / imageRef.current.height;
        canvas.width = maxHeight * aspectRatio;
        canvas.height = maxHeight;

        inputContainerRef.current.style.width = `${canvas.width}px`;

        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

        // Texto Superior
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 10, canvas.width, 30);
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(topText, canvas.width / 2, 30);

        // Texto Inferior
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 40);
        ctx.fillStyle = 'white';
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);

        if (downloadLinkRef.current) {
            downloadLinkRef.current.href = canvas.toDataURL('image/jpg');
            downloadLinkRef.current.download = 'meme.jpg';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateCanvas);
        updateCanvas();
        return () => window.removeEventListener('resize', updateCanvas);
    }, [topText, bottomText]);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-200">
            <div ref={inputContainerRef} className="mb-0 flex flex-col space-y-1">
                <input type="text" value={topText} onChange={e => { setTopText(e.target.value); updateCanvas(); }} className="p-2 border rounded w-full" placeholder="Texto Superior" />
                <input type="text" value={bottomText} onChange={e => { setBottomText(e.target.value); updateCanvas(); }} className="p-2 border rounded w-full" placeholder="Texto Inferior" />
            </div>
            <div>
                <a ref={downloadLinkRef}>
                    <canvas ref={canvasRef} />
                </a>
            </div>
        </div>
    );
};

export default MemeGenerator;
