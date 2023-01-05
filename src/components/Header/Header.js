import { useEffect, useState } from 'react';
import './style.scss'
import { Loader } from '../Loader/Loader';

export const Header = () => {
  const [toUSD, setToUSD] = useState(0);
  const [toEUR, setToEUR] = useState(0);
  const [toPLN, setToPLN] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false)

  const loadCurrensy = async(toCurrensy, setToCurrensy) => {
    await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${toCurrensy}.json`)
      .then(res => res.json())
      .then(res => {
        setToCurrensy(res[toCurrensy].uah)
      })
      .catch(err => {
        console.warn(err)
      });
  }
  
  useEffect(() => {
    loadCurrensy('usd', setToUSD)
    loadCurrensy('eur', setToEUR)
    loadCurrensy('pln', setToPLN)
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <Loader></Loader>
    )
  }

  return (
    <div className="Header">
      <div className='Header__price'>
        1 UAH = {toUSD.toFixed(2)} USD
      </div>
      <div className='Header__price'>
        1 UAH = {toEUR.toFixed(2)} EUR 
      </div>
      <div className='Header__price'>
        1 UAH = {toPLN.toFixed(2)} PLN 
      </div>
    </div>
  );
}
