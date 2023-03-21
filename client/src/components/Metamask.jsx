import React from 'react'
import "../styles/Metamask.css"
export default function Metamask() {

    return (
        <>
            <main>
                <h1

                    style={{
                        color: "#e7ebf2",
                        fontSize: "12.5rem",
                        letterSpacing: " 0.1em",
                        margin: "0.025em 0",
                        whiteSpace: "nowrap"
                    }}
                >😢</h1>
                <h2 style={{
                    color: "#e7ebf2",
                    marginBottom: "0.4em"
                }} >Error:  <span


                    style={{
                        color: "yellow",
                        fontSize: "4rem",
                        fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                        margin: "4px 10px"
                    }}

                >
                        METAMASK
                    </span>
                    not found</h2>
                <p style={{
                    color: "#ccc",
                    marginTop: "0",
                    fontSize: "2rem"
                }} >Please install metamask to access the webstie</p>
            </main>
        </>
    )
}
