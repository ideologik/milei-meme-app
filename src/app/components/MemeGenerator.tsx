'use client'

import React, { useRef, useState, useEffect } from 'react';

const MemeGenerator = () => {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const canvasRef = useRef(null);
    const [imageWidth, setImageWidth] = useState(0);

    const updateCanvas = () => {
        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = './assets/milei_meme.jpg'; // Ruta de tu imagen
        image.onload = () => {
            const aspectRatio = image.width / image.height;
            const newImageWidth = (window.innerHeight - 100) * aspectRatio;
            setImageWidth(newImageWidth);
            canvas.width = newImageWidth;
            canvas.height = window.innerHeight - 100;

            ctx.drawImage(image, 0, 0, newImageWidth, canvas.height);

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
        };
    };

    // Asegurarse de que el lienzo se actualice cuando se carga el componente
    useEffect(() => {
        updateCanvas();
    }, [topText, bottomText]);

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-200">
            <div className="mb-4 flex space-x-4">
                <input type="text" value={topText} onChange={e => { setTopText(e.target.value); updateCanvas(); }} className="p-2 border rounded" placeholder="Texto Superior" />
                <input type="text" value={bottomText} onChange={e => { setBottomText(e.target.value); updateCanvas(); }} className="p-2 border rounded" placeholder="Texto Inferior" />
            </div>
            <div style={{ width: `${imageWidth}px` }}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

export default MemeGenerator;
