import { getFarewellText } from "./utils"
import { languages } from "./language";
export default function Header({ ended, won }) {
    
    const WinMessage = () => (
        <div className="ended-win" role="alert">
            <h2>You win!</h2>
            <h2>Well Done 🎉</h2>
        </div>
    );

    const LoseMessage = () => (
        <div className="ended-lose" role="alert">
            <h2>Game Over!</h2>
            <h2>You lose! Better start learning Assembly 😭</h2>
        </div>
    );


    return (
        <header>
            <div className="header-content">
                <h2>Assembly:Endgame</h2>
                <h3>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</h3>
            </div>
            <div className="message-container">
                {ended && (won ? <WinMessage /> : <LoseMessage />)}
            </div>
        </header>
    )
}