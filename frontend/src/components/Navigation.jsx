import React, { useState } from 'react'
import '../styles/Navigation.css'
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Navigation({ account, setAccount }) {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
        toast.success('Wallet connected', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={12000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* Same as */}
            <ToastContainer />
            <nav>
                <div className='navBrand'>
                    <h1>Dkart</h1>
                </div>

                <input
                    type="text"
                    className="navSearch"
                />

                {account ? (

                    <h1 style={{ color: "azure", margin: "10px auto" }}>

                        Connected
                    </h1>
                ) : (
                    <button
                        type="button"
                        className='navConnect'
                        onClick={connectHandler}
                    >
                        Connect
                    </button>
                )}

                <ul className='navLinks'>
                    <li><a href="#Clothing & Jewelry">Clothing & Jewelry</a></li>
                    <li><a href="#Electronics & Gadgets">Electronics & Gadgets</a></li>
                    <li><a href="#Toys & Gaming">Toys & Gaming</a></li>
                </ul>
            </nav>
        </>
    )
}
