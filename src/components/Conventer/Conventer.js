import { useEffect, useState } from 'react';
import './style.scss';
import { Block } from '../Block/Block';
  
export const Conventer = () => {
  const [rates, setRates] = useState({})
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [fromCurrensy, setFromCurrensy] = useState('uah')
  const [toCurrensy, setToCurrensy] = useState('usd')

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`)
      .then(res => res.json())
      .then(res => {
        console.log(res.usd)
        setRates(res.usd)
      })
      .catch(err => {
        console.warn(err)
      });
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrensy]
    const result = price * rates[toCurrensy]
    setToPrice(result.toFixed(2))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrensy] / rates[toCurrensy]) * value;
    setFromPrice(result.toFixed(2)) 
    setToPrice(value)
  }
  
  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrensy])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrensy])

  return (
    <div className="Conventer">
      <Block value={fromPrice} currency={fromCurrensy} onChangeCurrency={setFromCurrensy} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrensy} onChangeCurrency={setToCurrensy} onChangeValue={onChangeToPrice}/>
    </div>
  );
}
  




















/*
import React, {useCallback, useEffect, useState} from 'react';
import './style.scss'

const BASE_URL = 'https://api.apilayer.com/fixer/convert'
// const BASE_URL = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency'

const myHeaders = new Headers();
myHeaders.append("apikey", "HJe5lyS48wqauKl9I79tLfvFlFuPLaur");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// const debounce = (f, delay) => {
//   let timerId;

//   return (...args) => {
//     clearTimeout(timerId)
//     timerId = setTimeout(f, delay, ...args)
//   }
// }

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b72432934cmsh65475b93d6cf037p1a57e3jsnfa88be1f742c',
		'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
	}
};

export const Conventer = () => {
  const [state, setState] = useState()
  const [cur1, setCur1] = useState('USD')
  const [cur2, setCur2] = useState('UAH')
  const [cur1a, setCur1a] = useState(0)
  const [cur2a, setCur2a] = useState(0)


  // const req = `?to=${cur2}&from=${cur1}&amount=${cur1a}`;
  // const req2 = `?to=${cur1}&from=${cur2}&amount=${cur2a}`;
  

  const makeReq = async(x) => {
    const req = `?to=${cur2}&from=${cur1}&amount=${x}`;
    await fetch(`${BASE_URL}${req}`, requestOptions)
      .then(response => response.json())
      .then(result => setCur2a(result.result))
  }

  const makeReq2 = async(x) => {
    const req2 = `?to=${cur1}&from=${cur2}&amount=${x}`;
    await fetch(`${BASE_URL}${req2}`, requestOptions)
      .then(response => response.json())
      .then(result => setCur1a(result.result))
  }

  useEffect(() => {
    console.log(cur1a)
    // makeReq(cur1a)
  }, [cur1, cur1a, cur2])

  useEffect(() => {
    console.log(cur2a)
    // makeReq2(cur2a)
  }, [cur2, cur2a, cur1])

  // const loadData = async() => {
  //   await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&valcode=EUR')
  //     .then(res => res.json())
  //     .then(res => console.log(res[0].rate))
  // }

  // useEffect(() => {
  //   loadData()
  // }, [])

  // const makeReq = useCallback(async() => {
  //  await fetch(`${BASE_URL}?have=${cur1}&want=${cur2}&amount=${cur1a}`, options)
  //  .then(response => response.json())
  //  .then(response => setCur2a(response.new_amount))
  //  .catch(err => console.error(err));
  // }, [cur1, cur1a, cur2])

  // const makeReq = async() => {
  //   await fetch(`${BASE_URL}?have=${cur1}&want=${cur2}&amount=${cur1a}`, options)
  //   .then(response => response.json())
  //   .then(response => setCur2a(response.new_amount))
  //   .catch(err => console.error(err));
  //  }

  // useEffect(() => {
  //   console.log(cur1a)
  //   makeReq()
  //   // console.log(state)
  // }, [makeReq]) 
  
  // const makeReq2 = useCallback(async() => {
  //   await fetch(`${BASE_URL}?have=${cur2}&want=${cur1}&amount=${cur2a}`, options)
  //   .then(response => response.json())
  //   .then(response => setCur1a(response.new_amount))
  //   .catch(err => console.error(err));
  //  }, [cur2, cur2a, cur1])
 
  //  useEffect(() => {
  //   console.log(state)
  //    makeReq2()
  //  }, [makeReq2])  

  return (
    <div className="conventer">
      <div className='conventer__2'>
        <input type='number' value={cur1a} onChange={async(e) => {
          setCur1a(e.target.value)
          // console.log(cur1a)
          // await makeReq()
        }}></input>
        <select value={cur1} onChange={(e) => setCur1(e.target.value)}>
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>

      <div className='conventer__2'>
        <input type='number' value={cur2a} onChange={async(e) => {
          setCur2a(e.target.value)
          // await makeReq2()
        }}></input>
        <select value={cur2} onChange={(e) => setCur2(e.target.value)}>
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  );
}




*/







/*
import React, {useCallback, useEffect, useState} from 'react';
import './style.scss'

const BASE_URL = 'https://api.apilayer.com/fixer/convert'

const myHeaders = new Headers();
myHeaders.append("apikey", "90TqvjAWi78jO3mzaEraXyQlKuXgPSbT");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const debounce = (f, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(f, delay, ...args)
  }
}

export const Conventer = () => {
  const [state, setState] = useState()
  const [cur1, setCur1] = useState('USD')
  const [cur2, setCur2] = useState('UAH')
  const [cur1a, setCur1a] = useState(0)
  const [cur2a, setCur2a] = useState(0)

  // const req = `?to=${cur2}&from=${cur1}&amount=${cur1a}`;
  // const req2 = `?to=${cur1}&from=${cur2}&amount=${cur2a}`;
  

  const makeReq = useCallback(async() => {
    const req = `?to=${cur2}&from=${cur1}&amount=${cur1a}`;
    await fetch(`${BASE_URL}${req}`, requestOptions)
      .then(response => response.json())
      .then(result => setState(result.result))
  }, [cur1, cur1a])

  const makeReq2 = useCallback(async() => {
    const req2 = `?to=${cur1}&from=${cur2}&amount=${cur2a}`;
    await fetch(`${BASE_URL}${req2}`, requestOptions)
      .then(response => response.json())
      .then(result => setState(result.result))
  }, [cur2, cur2a])

  const handleSecF = useCallback(async(e) => {
    // setCur1a(e.target.value)
    // await debounce(makeReq, 1000)
    // await makeReq()
    setCur2a(state)
  }, [makeReq, state])

  const handleSecSel = useCallback(async(e) => {
    setCur2a(e.target.value)
    // await debounce(makeReq2, 1000)
    // await makeReq2()
    setCur1a(state)
  }, [makeReq2, state])

  useEffect(() => {
    // loadData()
  }, [handleSecF])

  return (
    <div className="conventer">
      <div className='conventer__2'>
        <input type='number' value={cur1a} onChange={async(e) => {
          setCur1a(e.target.value)
          await handleSecF()
        }}></input>
        <select value={cur1} onChange={(e) => setCur1(e.target.value)}>
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>

      <div className='conventer__2'>
        <input type='number' value={cur2a} onChange={handleSecSel}></input>
        <select value={cur2} onChange={(e) => setCur2(e.target.value)}>
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  );
}
*/