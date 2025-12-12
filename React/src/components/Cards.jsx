export function Card({ className = "", children }) {
    return (
        <div className={`card-root ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ className = "", children }) {
    return (
        <div className={`card-content ${className}`}>
            {children}
        </div>
    );
}
