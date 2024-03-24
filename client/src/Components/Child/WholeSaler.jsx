import React, { useEffect, useState } from 'react'
import "./Farmer.css"
import Child from './Child';
function WholeSaler({state,address,proxyAddress}) {
    const [rid,setRid] = useState('');
    const [pid,setPid] = useState('');
    const [sid, setId] = useState('');
    const [email, setEmail] = useState('');
    const [datas, setDatas]=useState([])
    const [errors, setErrors]=useState()
    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setWholesaler',
                    type: 'function',
                    inputs: [
                        {
                            type: 'uint256',
                            name: '_retailerID'
                        },
                        {
                            type: 'uint256',
                            name: '_productID'
                        },
                        {
                            type: 'uint256',
                            name: '_salesID'
                        },
                        {
                            type: 'address',
                            name: '_add'
                        },
                        {
                            type: 'string',
                            name: '_email'
                        },
                        
                    ]
                }, [rid, pid, sid,address,email]);
                  const transaction = {
                    from: address,
                    to: proxyAddress,
                    data: data,
                };
console.log("datasending is: ",transaction)
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
                        name: 'getWholesaler',
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
                            { type: 'uint256', name: 'retailerID' },
                            { type: 'uint256', name: 'productID' },
                            { type: 'uint256', name: 'salesID' },
                            { type: 'address', name: 'add' },
                            { type: 'string', name: 'email' },
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
    <div className="row"><Child/></div>
    <div className="row">
    <div className="col-sm-12" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' > WholeSaler</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Retailer Id</label>
                        <input type="number" className="form-control" id="inputName" value={rid} onChange={(e) => setRid(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Product Id</label>
                        <input type="number" className="form-control" id="inputAge" value={pid} onChange={(e) => setPid(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Sales Id</label>
                        <input type="number" className="form-control" id="inputAge" value={sid} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">email</label>
                        <input type="email" className="form-control" id="inputAge" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>

        </div>
        <hr />
        <div className="col-sm-12">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > WholeSaler </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (

                
  <>
            <table className='container-fluid' style={{overflowX:"hidden"}} >
            <tr className='row1' > <th className='lock' ><p>Retailer ID</p></th>
      <th className='pid' ><p>Product ID</p></th>
      <th className='sid' ><p>Sales ID</p></th>
      <th className='email' ><p>email</p></th>
      <th className='adder' ><p>address</p></th>      
            </tr>

                                {datas.map((item, index) => (
                                
                                    <tr className='roww2' key={index} >
                                    <td><p>{item.retailerID}</p></td>
                                
                                    <td><p>{item.productID} </p></td>
                                    <td><p>{item.salesID} </p></td>
                                    <td><p>{item.email} </p> </td>
                                    <td><p>{item.add} </p> </td>
                                   
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

export default WholeSaler
