import { languages } from "./language";

export default function Languages({ left }) {
    return (
        <div className="language-list">
            {languages.map((language, index) => (
                <div 
                    key={index} 
                    className="languages" 
                    style={{ 
                        backgroundColor: language.backgroundColor, 
                        color: language.color, 
                        opacity: index < left ? 0.3 : 1, // Reduced opacity for clearer effect
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '8px',
                        position: 'relative'
                    }}
                >
                    {index < left && <span style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', opacity: 1 }}>💀</span>}
                    <span>{language.name}</span>
                </div>
            ))}
        </div>
    );
}
