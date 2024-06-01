import { TURNS } from "../constants"
import Square from "./Square"

function TurnModal({ turn }) {
    return (
        <section className="turn">
            <Square isSelected={turn === TURNS.x}>
                {TURNS.x}
            </Square>
            <Square isSelected={turn === TURNS.o}>
                {TURNS.o}
            </Square>
        </section>
    )
}
export default TurnModal