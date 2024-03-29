import { useState } from 'react'
import { useEffect } from 'react'
import { ethers } from 'ethers';
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import Dkart from './abis/Dkart.json'
import { RotatingSquare } from 'react-loader-spinner'
import "./App.css"
import Metamask from './components/Metamask';
function App() {
  const [provider, setProvider] = useState(null);
  const [dkart, setDkart] = useState(null);
  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)


  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  if (!window.ethereum)
    return <><Metamask /></>



  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    if (provider) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    setProvider(provider)
    const network = await provider.getNetwork()
    const dAddress = "0xe7BF6C60A447423A4068585DE6a1E32B5f6600E4";
    const dkart = new ethers.Contract(dAddress, Dkart.abi, provider)

    setDkart(dkart)
    const items = []
    for (var i = 0; i < 9; i++) {
      const item = await dkart.items(i + 1)
      items.push(item)
    }
    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }


  useEffect(() => {
    loadBlockchainData();
  }, [])

  if (!electronics || !clothing || !toys)
    return <RotatingSquare
      height="100"
      width="100"
      color="#250d42"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      wrapperStyle={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "azure" }}
      wrapperClass=""
      visible={true}
    />



  return (
    <div className="App">
      <Navigation account={account} setAccount={setAccount} />

      <h2 style={{ margin: "10px auto", textAlign: "center", padding: "10px" }}  >Our Best Sellers</h2>

      {clothing ? <Section title={"Clothing and Jewellery"} items={clothing} togglePop={togglePop} /> : null}

      {
        electronics ? <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} /> : null
      }


      {
        toys ? <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} /> : null
      }

      {
        toggle && (
          <Product item={item} provider={provider} account={account} dkart={dkart} togglePop={togglePop} />
        )
      }


      <footer className='foot' >
        &copy; 2023 All Rights Reserved @ Shobhit Kushwaha
      </footer>
    </div >
  )
}

export default App
