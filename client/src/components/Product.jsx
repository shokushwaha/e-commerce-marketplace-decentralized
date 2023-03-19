import React, { useState, useEffect } from 'react'
import Rating from './Rating'
import { ethers } from 'ethers';
import '../styles/Product.css'
import close from '../assets/close.svg'
export default function Product({ item, provider, account, dkart, togglePop }) {
    const [order, setOrder] = useState(null)
    const [hasBought, setHasBought] = useState(false)

    const fetchDetails = async () => {
        const events = await dkart.queryFilter("Buy")
        const orders = events.filter(
            (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
        )

        if (orders.length === 0) return

        const order = await dkart.orders(account, orders[0].args.orderId)
        setOrder(order)
    }

    const buyHandler = async () => {
        const signer = await provider.getSigner()

        let transaction = await dkart.connect(signer).buy(item.id, { value: item.cost })
        await transaction.wait()

        setHasBought(true)
    }

    useEffect(() => {
        fetchDetails()
    }, [hasBought])

    return (
        <div className="product">
            <div className="productDetails">
                <div className="productImage">
                    <img src={item.image} alt="Product" />
                </div>
                <div className="productOverview">
                    <h1>{item.name}</h1>

                    <Rating value={item.rating} />

                    <hr />

                    <p>{item.address}</p>

                    <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

                    <hr />

                    <h2>Overview</h2>

                    <p>
                        {item.description}

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
                        consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
                        commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
                    </p>
                </div>

                <div className="productOrder">
                    <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>

                    <p>
                        FREE delivery <br />
                        <strong>
                            {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                        </strong>
                    </p>

                    {item.stock > 0 ? (
                        <p>In Stock.</p>
                    ) : (
                        <p>Out of Stock.</p>
                    )}

                    <button className='productBuy' onClick={buyHandler}
                        disabled={!account}
                    >
                        Buy Now
                    </button>

                    <p><small>Ships from</small> DKart</p>
                    <p><small>Sold by</small> DKart</p>

                    {order && (
                        <div className='productBought'>
                            Item bought on <br />
                            <strong>
                                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                                    undefined,
                                    {
                                        weekday: 'long',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric'
                                    })}
                            </strong>
                        </div>
                    )}
                </div>


                <button onClick={togglePop} className="productClose">
                    <img src={close} alt="Close" />
                </button>
            </div>
        </div >
    );
}
