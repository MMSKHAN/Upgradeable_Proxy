import React, { useEffect, useState } from 'react'
import "./Farmer.css"
import Child from './Child';
function Logistics({state,address,proxyAddress}) {
    const [name, setName] = useState('');
    const [vehNumber, setVehNumber] = useState('');
    const [driverNumber, setdriverNumber] = useState('');
    const [driverName, setdriverName] = useState('');
    const [datas, setDatas]=useState([])
    const [errors, setErrors]=useState()
    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setLog',
                    type: 'function',
                    inputs: [
                        { type: 'address', name: '_id' },
                        { type: 'string', name: '_name' },
                        { type: 'uint256', name: '_vehumber' },
                        { type: 'uint256', name: '_drinumber' },
                        { type: 'string', name: '_drivername' }
                    ]
                }, [address, name, parseInt(vehNumber), parseInt(driverNumber), driverName]);

                const transaction = {
                    from: address,
                    to: proxyAddress,
                    data: data,
                };
             
                // transaction.gas = gas * 2;
                console.log("your data is ready to send",transaction)
                await web3.eth.sendTransaction(transaction);
                window.alert("Success");
            } catch (error) {
                window.alert(error.message);
                console.error("Error sending transaction:", error);
            }
        }
    }

    useEffect(() => {
        async function handleGetValue() {
            const { web3, contract } = state;
            if (contract) {
                try {
                    const data = web3.eth.abi.encodeFunctionCall({
                        name: 'getLog',
                        type: 'function',
                        inputs: []
                    }, []);

                    const transaction = {
                        from: address,
                        to: proxyAddress,
                        data: data
                    };

                    const result = await web3.eth.call(transaction);
                    const decodedResult = web3.eth.abi.decodeParameters(
                        [{ type: 'tuple[]', components: [
                            { type: 'address', name: 'id' },
                            { type: 'string', name: 'name' },
                            { type: 'uint256', name: 'vehumber' },
                            { type: 'uint256', name: 'drinumber' },
                            { type: 'string', name: 'drivename' }
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
    });

console.log(datas)
  return (
          <div>

<div className="container-fluid">
    <Child/>
    <div className="row">
    <div className="col-sm-12" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' >Logistics</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">vehicle Number</label>
                        <input type="number" className="form-control" id="inputAge" value={vehNumber} onChange={(e) => setVehNumber(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">driver_number</label>
                        <input type="number" className="form-control" id="inputAge" value={driverNumber} onChange={(e) => setdriverNumber(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">driver_name</label>
                        <input type="text" className="form-control" id="inputAge" value={driverName} onChange={(e) => setdriverName(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>

        </div>
        <hr />
        <div className="col-sm-12">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > Logistics List </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (

                
  <>
            <table className='conta'>
            <tr className='row1' >
      <th className='vehid' ><p>Address</p></th>
      <th className='vehname' ><p>Name</p></th>
      <th className='time' ><p>Vehicle Number</p></th>
      <th className='from' ><p>Driver Number</p></th>
      <th className='message' ><p>Driver Name</p></th>
      
            </tr>

                                {datas.map((item, index) => (
                                
                                    <tr className='row2' key={index} >
                                    <td><p>{item.id}</p></td>
                                
                                    <td><p>{item.name} </p></td>
                                    <td><p>{item.vehumber} </p></td>
                                    <td><p>{item.drinumber} </p> </td>
                                    <td><p>{item.drivename} </p> </td>
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

export default Logistics

