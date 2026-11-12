export const MNIST_SIZE = 28;
export const MNIST_PIXELS = 28 * 28;

export interface ProcessedImage {
    pixels: Float32Array;
    imageData: ImageData;
}

interface BoundingBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

/**
 * Extract the bounding box of the handwritten digit.
 */
function findBoundingBox(
    imageData: ImageData,
    threshold = 16
): BoundingBox | null {
    const { width, height, data } = imageData;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;

            // White-on-black input: use grayscale intensity.
            const intensity =
            0.299 * data[index] +
            0.587 * data[index + 1] +
            0.114 * data[index + 2];

            if (intensity > threshold) {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
    }

    if (maxX < 0) return null;

    return { minX, minY, maxX, maxY };
}

/**
 * Resize the digit to fit within 20x20 pixels.
 * Preserve the original aspect ratio.
 */
function resizeDigit(
    source: ImageData,
    bounds: BoundingBox
): HTMLCanvasElement {
    const cropWidth = bounds.maxX - bounds.minX + 1;
    const cropHeight = bounds.maxY - bounds.minY + 1;

    const scale = 20 / Math.max(cropWidth, cropHeight);

    const resizedWidth = Math.max(
        1,
        Math.round(cropWidth * scale)
    );

    const resizedHeight = Math.max(
        1,
        Math.round(cropHeight * scale)
    );

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = cropWidth;
    sourceCanvas.height = cropHeight;

    const sourceCtx = sourceCanvas.getContext("2d")!;

    const cropped = sourceCtx.createImageData(
        cropWidth,
        cropHeight
    );

    for (let y = 0; y < cropHeight; y++) {
        for (let x = 0; x < cropWidth; x++) {
            const srcIndex = ((bounds.minY + y) * source.width + (bounds.minX + x)) * 4;
            const dstIndex = (y * cropWidth + x) * 4;
            const intensity = 0.299 * source.data[srcIndex] + 0.587 * source.data[srcIndex + 1] + 0.114 * source.data[srcIndex + 2];
            cropped.data[dstIndex] = intensity;
            cropped.data[dstIndex + 1] = intensity;
            cropped.data[dstIndex + 2] = intensity;
            cropped.data[dstIndex + 3] = 255;
        }
    }

    sourceCtx.putImageData(cropped, 0, 0);

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = resizedWidth;
    resizedCanvas.height = resizedHeight;

    const resizedCtx = resizedCanvas.getContext("2d")!;

    resizedCtx.imageSmoothingEnabled = true;
    resizedCtx.imageSmoothingQuality = "high";

    resizedCtx.drawImage(
        sourceCanvas,
        0,
        0,
        resizedWidth,
        resizedHeight
    );

    return resizedCanvas;
}

/**
 * Calculate the intensity-weighted center of mass.
 */
function findCenterOfMass(
    image: ImageData
): { x: number; y: number } {
    const { width, height, data } = image;

    let totalMass = 0;
    let weightedX = 0;
    let weightedY = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const intensity = data[index];

            totalMass += intensity;
            weightedX += x * intensity;
            weightedY += y * intensity;
        }
    }

    if (totalMass === 0) {
        return {
            x: (width - 1) / 2,
            y: (height - 1) / 2,
        };
    }

    return {
        x: weightedX / totalMass,
        y: weightedY / totalMass,
    };
}

/**
 * Convert the drawing into a normalized 28x28 MNIST image.
 */
export function preprocessImage(
    input: ImageData
): ProcessedImage {
    const bounds = findBoundingBox(input);

    // Return an empty image when nothing has been drawn.
    const output = document.createElement("canvas");
    output.width = MNIST_SIZE;
    output.height = MNIST_SIZE;

    const ctx = output.getContext("2d")!;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, MNIST_SIZE, MNIST_SIZE);

    if (!bounds) {
        const emptyImage = ctx.getImageData(
            0,
            0,
            MNIST_SIZE,
            MNIST_SIZE
        );

        return {
            pixels: new Float32Array(MNIST_PIXELS),
            imageData: emptyImage,
        };
    }

    const resized = resizeDigit(input, bounds);

    // First center the resized image geometrically.
    const offsetX = Math.floor(
        (MNIST_SIZE - resized.width) / 2
    );

    const offsetY = Math.floor(
        (MNIST_SIZE - resized.height) / 2
    );

    ctx.drawImage(resized, offsetX, offsetY);

    // Then center the image by its center of mass.
    const initialImage = ctx.getImageData(
        0,
        0,
        MNIST_SIZE,
        MNIST_SIZE
    );

    const center = findCenterOfMass(initialImage);

    const targetCenter = (MNIST_SIZE - 1) / 2;

    const shiftX = Math.round(targetCenter - center.x);
    const shiftY = Math.round(targetCenter - center.y);

    const centered = document.createElement("canvas");
    centered.width = MNIST_SIZE;
    centered.height = MNIST_SIZE;

    const centeredCtx = centered.getContext("2d")!;

    centeredCtx.fillStyle = "black";
    centeredCtx.fillRect(0, 0, MNIST_SIZE, MNIST_SIZE);

    centeredCtx.drawImage(
        output,
        shiftX,
        shiftY
    );

    const imageData = centeredCtx.getImageData(
        0,
        0,
        MNIST_SIZE,
        MNIST_SIZE
    );

  // Convert grayscale intensities into normalized floats.
    const pixels = new Float32Array(MNIST_PIXELS);

    for (let i = 0; i < MNIST_PIXELS; i++) {
        const index = i * 4;

        pixels[i] = imageData.data[index] / 255;
    }

    return {
        pixels,
        imageData,
    };
}
