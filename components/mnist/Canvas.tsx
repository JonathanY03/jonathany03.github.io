"use client";

import { useRef, useState } from "react";

interface DrawingCanvasProps {
    onChange?: (imageData: ImageData) => void;
    brushSize?: number;
}

const Canvas = ({ onChange, brushSize = 18 }: DrawingCanvasProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawingRef = useRef(false);
    const [isDrawing, setIsDrawing] = useState(false);

    const SIZE = 280;

    const getPos = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        return {
            x: event.clientX - (rect?.left ?? 0) * (SIZE / (rect?.width ?? SIZE)),
            y: event.clientY - (rect?.top ?? 0) * (SIZE / (rect?.height ?? SIZE)),
        };
    };

    const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            event.preventDefault();
            canvas.setPointerCapture(event.pointerId);
            const context = canvas.getContext("2d");
            if (context) {
                const pos = getPos(event);
                drawingRef.current = true;
                setIsDrawing(true);
                context.beginPath();
                context.moveTo(pos.x, pos.y);
                context.fillStyle = "white";
                context.fill();
            };
        };
    };

    const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return;
        event.preventDefault();
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                const pos = getPos(event);
                context.lineWidth = brushSize;
                context.lineCap = "round";
                context.lineJoin = "round";
                context.strokeStyle = "white";
                context.lineTo(pos.x, pos.y);
                context.stroke();
                context.beginPath();
                context.moveTo(pos.x, pos.y);
            };
        }
    };

    const stopDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return;
        drawingRef.current = false;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && canvas) {
            onChange?.(context.getImageData(0, 0, SIZE, SIZE));
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && canvas) {
            context.fillStyle = "black";
            context.fillRect(0, 0, SIZE, SIZE);
            onChange?.(context.getImageData(0, 0, SIZE, SIZE));
        }
    };

    return(
        <div className="flex flex-col gap-2">
            <p>Draw a digit (0-9)</p>
            <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerCancel={stopDrawing}
                onLostPointerCapture={stopDrawing}
                className="w-full max-w-[280px] aspect-square rounded bg-black"
            />
            <button type="button" onClick={clearCanvas} className="rounded hover:underline text-left">Clear</button>
        </div>
    );
};

export default Canvas;
