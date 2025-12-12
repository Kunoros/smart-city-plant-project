// ...new file...
export default function PlantIcon({ size = 36, color = '#f97316' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2C12 2 7 6 7 10c0 3 2 6 5 8 3-2 5-5 5-8 0-4-5-8-5-8z" fill={color} />
            <path d="M6 18c1.5-1 3-1.5 6-1.5s4.5.5 6 1.5v2H6v-2z" fill="#A16207" opacity="0.25"/>
        </svg>
    );
}

