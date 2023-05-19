/* eslint-disable react/prop-types */
import "./Die.css"

function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className = "die-face"
        style = {styles}
        onClick={props.holdDice}>
            <h2 className = "die-value">{props.value}</h2>
        </div>
    )
}

export default Die