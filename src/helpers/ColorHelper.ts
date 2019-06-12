export default class ColorHelper {
    public static gradient2(step: number, firstColor: string, secondColor: string): string {
        const firstColorRGB = ColorHelper.hexColorToRGBValues(firstColor);
        const secondColorRGB = ColorHelper.hexColorToRGBValues(secondColor);

        const diff: RGBValue = {
            r: secondColorRGB.r - firstColorRGB.r,
            g: secondColorRGB.g - firstColorRGB.g,
            b: secondColorRGB.b - firstColorRGB.b
        };

        const newColor: RGBValue = {
            r: Math.floor(firstColorRGB.r + step * diff.r),
            g: Math.floor(firstColorRGB.g + step * diff.g),
            b: Math.floor(firstColorRGB.b + step * diff.b),
        };

        return ColorHelper.RGBValueToHexColor(newColor);
    }

    public static hexColorToRGBValues(color: string): RGBValue {
        let values = color
            .substring(1)
            .match(/.{1,2}/g)
            .map(value => parseInt(value, 16));

        return {
            r: values[0],
            g: values[1],
            b: values[2]
        }
    }

    public static RGBValueToHexColor(color: RGBValue): string {
        const transform = (val: number) => val.toString(16).padStart(2, '0');

        return `#${transform(color.r)}${transform(color.g)}${transform(color.b)}`;
    }
}

interface RGBValue {
    r: number;
    g: number;
    b: number;
}