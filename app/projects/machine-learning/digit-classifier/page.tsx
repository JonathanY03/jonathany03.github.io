"use client";

import { useMemo, useState } from "react";
import Canvas from "@/components/mnist/Canvas";
import View from "@/components/mnist/View";
import {preprocessImage} from "@/lib/mnist/preprocessing";

const Page = () => {
    const [inputImage, setInputImage] = useState<ImageData | null>(null);

    const processedImage = useMemo(() => {
        if (!inputImage) return null;
        return preprocessImage(inputImage);
    }, [inputImage]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[80%] p-8">
                <h1 className="text-3xl mb-4 text-center">MNIST Digit Classifier</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <span>
                        <h2 className="text-2xl mb-2">Drawing Canvas</h2>
                        <Canvas onChange={setInputImage} />
                    </span>
                    <span>
                        <h2 className="text-2xl mb-2">Preprocessed Image</h2>
                        <View imageData={processedImage?.imageData ?? null} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Page;
