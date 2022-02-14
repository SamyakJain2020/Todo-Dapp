import React from 'react'

const card = ({user,heading,desc,status}) => {
    return (
        <li>
            <h1>CARD</h1>
            <h1>
                {heading}
            </h1>
            <p>
                AUTHOR:{user}
            </p>
            <p>
                {desc}
            </p>
            <p>
                STATUS: {(status == 0)?"NON DONE": "DONE" }
            </p>
        </li>
    )
}

export default card
