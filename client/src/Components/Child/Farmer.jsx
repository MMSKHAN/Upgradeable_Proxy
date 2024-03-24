import React, { useEffect, useState } from 'react'
import "./Farmer.css"
import Child from './Child';
function Farmer({state,address,proxyAddress}) {
    const [name, setName] = useState('');
    const [varity, setVarity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dateofharvest, setdateofharvest] = useState('');
    const [datas, setDatas]=useState([])
    const [errors, setErrors]=useState()
    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setKisan',
                    type: 'function',
                    inputs: [
                        {
                            type: 'string',
                            name: '_name'
                        },
                        {
                            type: 'address',
                            name: '_add'
                        },
                        {
                            type: 'string',
                            name: '_variety'
                        },
                        {
                            type: 'uint256',
                            name: '_quantity'
                        },
                        {
                            type: 'string',
                            name: ' _dateofharvest'
                        }
                    ]
                }, [name, address, varity,quantity,dateofharvest]);
                  const transaction = {
                    from: address,
                    to: proxyAddress,
                    data: data,
                };

                await web3.eth.sendTransaction(transaction);
                window.alert("Success");
            } catch (error) {
                window.alert(error.message);
                // console.error("Error sending transaction:", error);
            }
        }
    }
    useEffect(()=>{
        async function handleGetValue(e) {
     
            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'getKisan',
                        type: 'function',
                        inputs: []
                    }, []);
                    const transaction = {
                        from: address,
                        to: proxyAddress,
                        data: data,
                    };
        
                    const result = await web3.eth.call(transaction);
                    console.log("reiryuouifygui", result);
                    const decodedResult = web3.eth.abi.decodeParameters(
                        [{ type: 'tuple[]', components: [
                            { type: 'string', name: 'name' },
                            { type: 'address', name: 'add' },
                            { type: 'string', name: 'variety' },
                            { type: 'uint256', name: 'quantity' },
                            { type: 'string', name: 'dateofharvest' }
                        ] }],
                        result
                    );
    
                  
    
                    setDatas(decodedResult[0]); 
         
                } catch (error) {
                   setErrors(error)
                }
            }
        }
    handleGetValue();
    })

  return (
          <div>
            <div className="container-fluid">
<Child/>
</div>


<div className="container-fluid">
    <div className="row">
    <div className="col-sm-12" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' >Farmer</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Varity</label>
                        <input type="text" className="form-control" id="inputAge" value={varity} onChange={(e) => setVarity(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="inputAge" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Harvesting Date</label>
                        <input type="date" className="form-control" id="inputAge" value={dateofharvest} onChange={(e) => setdateofharvest(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>

        </div>
        <hr />
        <div className="col-sm-12">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > Farmers List </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (

                
  <>
            <table className='conta'>
            <tr className='row1' > <th className='name' ><p>Name</p></th>
      <th className='money' ><p>Address</p></th>
      <th className='time' ><p>Vatiety</p></th>
      <th className='from' ><p>Quantity</p></th>
      <th className='message' ><p>Harvesting Date</p></th>
      
            </tr>

                                {datas.map((item, index) => (
                                
                                    <tr className='row2' key={index} >
                                    <td><p>{item.name}</p></td>
                                
                                    <td><p>{item.add} </p></td>
                                    <td><p>{item.variety} </p></td>
                                    <td><p>{item.quantity} </p> </td>
                                    <td><p>{item.dateofharvest} </p> </td>
                                  </tr>
                                ))}
                                            </table>  
                    </>
            )}

        </div>
    </div>
</div>

        </div>
  )
}

export default Farmer
