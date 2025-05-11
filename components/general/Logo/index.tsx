import { Image } from "expo-image";

interface LogoProps {
    width: number;
    height: number;
};

export default function Logo({ width, height }: LogoProps) {
    return (
        <Image
            source={require('@/assets/images/logo.svg')}
            style={{ width, height }}
        />
    );
}