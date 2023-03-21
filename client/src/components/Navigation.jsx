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
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    const handleLogout = () => {
        setAccount(null);
        toast.success('Logged Out', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        window.location.reload();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
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
                    <>
                        <div className="acccBox">

                            <h1 style={{ color: "azure", margin: "10px auto", borderBottom: "2px solid azure", borderTop: "2px solid azure", padding: "4px 0px" }}>
                                Connected
                            </h1>

                            <button type="button"
                                className='navConnect logout ' onClick={handleLogout} >Logout</button>
                        </div>
                    </>
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
