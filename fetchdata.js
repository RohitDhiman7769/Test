import { useState, useEffect } from 'react';
import axios from 'axios'

export default function FetchedUserData(productData, editMode, dataHandleInputChange, saveDataChanges, cancelIfDataEdit, toggleEditData, deleteUsersData, checkData) {

    const [isIndexValue, setIndexValue] = useState(productData)
    const [userInputEdit, setUserInputEdit] = useState(null)
    const [useProductEdit, setUserProductEdit] = useState(null)
    const [userProductIndex, setUserProductIndex] = useState(null)


    useEffect(() => {
        setIndexValue(productData.productData);
    }, [productData]);


    // EDIT ONLY USERS PERSONAL DATA INPUT
    const toggleEditMode = (index) => {
        console.log(index)
        setUserInputEdit(index)
    };


    //DELETE USERS FROM BACKEND API
    const deleteItem = async (userID, index) => {
        const userId = { userid: userID }
        try {
            const response = await axios.post('http://localhost:3001/delete-data', userId,
                {
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
            console.log(response)
            setIndexValue(isIndexValue.filter((_, id) => id !== index))

        } catch (err) {
            console.log(err)
        }
    };

    function userInputHandleChange(e) {
        const { name, value } = e.target
        console.log('name us:', name)
        console.log('value is :', value)
    }


    //CANCEL TO EDIT USERS PEROSONAL DETAILS
     function cancelToEditPersonalData(){
        setUserInputEdit(null)
     }


    //EDIT USERS PRODUCTS FUNCTION
    function editUserProducts(indexValue, index) {
        console.log(indexValue)
        console.log(index)
        setUserProductEdit(index)
        setUserProductIndex(indexValue)
    }

    //DELETE USERS PRODUCTS FUNCTION
    async function deleteUsersProducts(proId, productId,userIndex) {
        // setUserProductEdit(index)
        const productid = { productID: productId }

        try {
            const response = await axios.post('http://localhost:3001/delete-product', productid,
                {
                    headers: {
                        'content-type': 'application/json'
                    },
                })
            console.log(response)
            setIndexValue(isIndexValue.filter((_, id) => id == userIndex).filter((_,id)=> id !== proId))

        } catch (err) {
            console.log(err)
        }

    }


    //CANCEL IF EDIT RPODUCTS INPUT
    function cancelIfDataEdit() {
        setUserProductEdit(null)
    }

    return (
        <div>
            {(isIndexValue.length === 0) ?
                // IF NO DATA LABEL
                <div>
                    <p>No Data Found</p>
                </div>
                :
                // FETCHED DATA LABEL
                <div className='dataContainer'>


                    {/* USER FETCHED dATA */}
                    {isIndexValue.length && isIndexValue.map((data, index) => {

                        return (
                            <>
                                <div >
                                    <div className="dataContent">
                                        <div className='label'>

                                            {userInputEdit === index ?

                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ border: "1px solid black" }}>
                                                        <tr>
                                                            <th style={{ padding: "0 30px" }}>Name</th>
                                                            <th style={{ padding: "0 30px" }}>Discrithtion</th>
                                                            <th style={{ padding: "0 30px" }}>Country</th>
                                                            <th style={{ padding: "0 30px" }}>State</th>
                                                            <th style={{ padding: "0 30px" }}>Pin Code</th>
                                                        </tr>
                                                        <tr>
                                                            <td> <input value={data.userName} className='fetchedDataInput' onChange={(e) => userInputHandleChange(e)}></input></td>
                                                            <td><input value={data.userDiscription} className='fetchedDataInput'></input></td>
                                                            <td><input value={data.userCountry} className='fetchedDataInput'></input></td>
                                                            <td><input value={data.userState} className='fetchedDataInput'></input></td>
                                                            <td><input value={data.userPincode} className='fetchedDataInput'></input></td>

                                                        </tr>
                                                    </div>
                                                    <div style={{ paddingTop: '10px' }}>
                                                        <button>Save</button>
                                                        <button onClick={cancelToEditPersonalData}>Cancel</button>

                                                    </div>
                                                </div>

                                                :

                                                <div className='' style={{ display: 'flex', justifyContent: 'space-between', width: '50em' }}>
                                                    <div style={{ border: '1px solid black' }}>
                                                        <div >
                                                            <table>
                                                                <tr>
                                                                    <th style={{ padding: "0 30px" }}>Name</th>
                                                                    <th style={{ padding: "0 30px" }}>Discrithtion</th>
                                                                    <th style={{ padding: "0 30px" }}>Country</th>
                                                                    <th style={{ padding: "0 30px" }}>State</th>
                                                                    <th style={{ padding: "0 30px" }}>Pin Code</th>
                                                                </tr>

                                                                <tr >
                                                                    <td className='fetchedDataInputLabel'>{data.userName}</td>
                                                                    <td className='fetchedDataInputLabel'> {data.userDiscription}</td>
                                                                    <td className='fetchedDataInputLabel'>{data.userCountry}</td>
                                                                    <td className='fetchedDataInputLabel'>{data.userState}</td>
                                                                    <td className='fetchedDataInputLabel'>{data.userPincode}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div style={{ margin: 'auto' }}>
                                                        <button onClick={() => toggleEditMode(index)}>Edit</button>
                                                        <button onClick={() => deleteItem(data.userId, index)}>Delete</button>
                                                    </div>
                                                </div>
                                            }

                                        </div>



                                        {/* USER PRODUCT DATA CONTAINER */}
                                        <div style={{ display: 'flex' }}>
                                            {data.userProducts.map((Value, productsIndex) => {
                                                return (
                                                    <div key={productsIndex} className='userData'>

                                                        {userProductIndex === index && useProductEdit === productsIndex ?
                                                            <div className='productBox box2 '>

                                                                <div key={productsIndex} >

                                                                    <label className="productLabels">S. No. :</label>
                                                                    <input className='productsInputTags' value={Value.serialNumber} ></input>

                                                                    <label className="productLabels">P. Name :</label>
                                                                    <input className='productsInputTags' value={Value.productName} ></input>

                                                                    <label className="productLabels">Price</label>
                                                                    <input className='productsInputTags' value={Value.price} ></input>

                                                                    <label className="productLabels">Quantity</label>
                                                                    <input className='productsInputTags' value={Value.quantity} ></input>
                                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                        <button onClick={() => saveDataChanges(productsIndex)}>Save</button>
                                                                        <button onClick={() => cancelIfDataEdit(productsIndex)}>Cancel</button>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            :

                                                            <div className="productBox " >
                                                                <div >

                                                                    <label className="Productlabel">S. No. :</label>
                                                                    <p className='userproducts'>{Value.userSerialNumber}</p>

                                                                    <label className="Productlabel">P. Name :</label>
                                                                    <p className='userproducts'>{Value.userProductsName}</p>

                                                                    <label className="Productlabel">Price :</label>
                                                                    <p className='userproducts'>{Value.productPrice}</p>

                                                                    <label className="Productlabel">Quantity :</label>
                                                                    <p className='userproducts'>{Value.Quantity} </p>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <button onClick={() => editUserProducts(index, productsIndex)}>Edit</button>
                                                                    <button onClick={() => deleteUsersProducts(productsIndex, Value.productID, index)}>Delete</button>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>}
        </div >
    )
}


