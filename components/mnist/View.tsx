"use client";

import { useRef, useEffect } from "react";

interface PixelPreviewProps {
    imageData: ImageData | null;
}

const View = ({ imageData }: PixelPreviewProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && imageData) {
            const context = canvas.getContext("2d");
            if (context) {
                context.putImageData(imageData, 0, 0);
            };
        };
    }, [imageData]);
    return(
        <div className="flex flex-col gap-2">
            <p>Preprocessed input (28 x 28)</p>
            <canvas
                ref={canvasRef}
                width={28}
                height={28}
                className="w-[196px] h-[196px] rounded image-pixelated bg-black"
                style={{ imageRendering: "pixelated" }}
            />
        </div>
    );
};

export default View;
