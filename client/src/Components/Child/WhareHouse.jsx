import React, { useEffect, useState } from 'react'
import "./Farmer.css"

import Child from './Child';
function WhareHouse({state,address,proxyAddress}) {
    const [farmAdr,setFarmAdr] = useState('');
    const [packDate,setpackDate] = useState('');
    const [rtedate, setrteDate] = useState('');
    const [contact, setContacr] = useState('');
    const [datas, setDatas]=useState([])
    const [errors, setErrors]=useState()
    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setWare',
                    type: 'function',
                    inputs: [
                        {
                            type: 'string',
                            name: '_add'
                        },
                        {
                            type: 'string',
                            name: '_packingdate'
                        },
                        {
                            type: 'string',
                            name: '_rtedate'
                        },
                        {
                            type: 'string',
                            name: '_contact'
                        },
                        
                    ]
                }, [farmAdr, packDate, rtedate,contact]);
                  const transaction = {
                    from: address,
                    to: proxyAddress,
                    data: data,
                };

                await web3.eth.sendTransaction(transaction);
                window.alert("Success");
            } catch (error) {
                window.alert(error.message);
                console.error("Error sending transaction:", error);
            }
        }
    }
    useEffect(()=>{
        async function handleGetValue(e) {
     
            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'getWare',
                        type: 'function',
                        inputs: []
                    }, []);
                    const transaction = {
                        from: address,
                        to: proxyAddress,
                        data: data,
                    };
        
                    const result = await web3.eth.call(transaction);
                     const decodedResult = web3.eth.abi.decodeParameters(
                        [{ type: 'tuple[]', components: [
                            { type: 'string', name: 'add' },
                            { type: 'string', name: 'packingdate' },
                            { type: 'string', name: 'rtedate' },
                            { type: 'string', name: 'contact' },
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
<br />
<div className="row">
  <Child/>
</div>
</div>


<div className="container-fluid">
    <div className="row">
    <div className="col-sm-12" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' > Warehouse</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Location</label>
                        <input type="text" className="form-control" id="inputName" value={farmAdr} onChange={(e) => setFarmAdr(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Packing Date</label>
                        <input type="date" className="form-control" id="inputAge" value={packDate} onChange={(e) => setpackDate(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Receiving Date</label>
                        <input type="date" className="form-control" id="inputAge" value={rtedate} onChange={(e) => setrteDate(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Contact</label>
                        <input type="text" className="form-control" id="inputAge" value={contact} onChange={(e) => setContacr(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>

        </div>
        <hr />
        <div className="col-sm-12">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > WareHouses List </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (

                
  <>
            <table className='conta'>
            <tr className='row1' > <th className='lock' ><p>Location</p></th>
      <th className='pack' ><p>Packing Date</p></th>
      <th className='rec' ><p>Receiving Date</p></th>
      <th className='con' ><p>Contact</p></th>    
            </tr>

                                {datas.map((item, index) => (
                                
                                    <tr className='row2' key={index} >
                                    <td><p>{item.add}</p></td>
                                
                                    <td><p>{item.packingdate} </p></td>
                                    <td><p>{item.rtedate} </p></td>
                                    <td><p>{item.contact} </p> </td>
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

export default WhareHouse
