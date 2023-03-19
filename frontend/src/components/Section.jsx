import React from 'react'
import '../styles/Section.css'
import Rating from './Rating'
import { ethers } from 'ethers'
export default function Section({ title, items, togglePop }) {
    return (
        <div className='cardsSection'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {items.map((item, index) => (
                    <div className='card' key={index} onClick={() => togglePop(item)}>
                        <div className='cardImage'>
                            <img src={item.image} alt="Item" />
                        </div>
                        <div className='cardInfo'>
                            <h4 style={{ fontSize: "20px", padding: "4px" }} >{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>Cost:{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
