import Axios from "axios";
import React, { useState,useEffect } from 'react';
import { Form,FormControl,Button,Container,Table } from 'react-bootstrap'
   
export default function View_cart()
{
  
   const [mylist,setList]= useState([]);

// this is called repeatedly when ever u render
useEffect(() => {
  
   Axios.get("http://localhost:4200/showproduct").then(
        res=> setList(res.data));

    
    console.log("once");
    
  },[]);

  function onAddcart(e) {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    Axios.get(`http://localhost:4200/addcart/${id}`).then(res => {
      if(res.data.message == "Item already added"){
      alert(res.data.message);
    }
    else{
      alert("Product added to cart")
    }
     });
  };


  return (

            <div>

              <a href="/viewcart">View Cart Details</a>
                 <h3 align="center"><u> Select Products</u> </h3>


                 <Container>


            
<Table striped bordered hover>
<thead>
<th>Image</th> <th>Id </th> <th> Name</th><th> Price </th><th>Delete</th> <th>Edit</th>
</thead>
<tbody>
                        {mylist.map((item,index)=>{
                            
                            return(
                                <tr key={index}>
                                    <td><img src={item.product_image} width="200" height="200" alt="image" /></td>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.product_price}</td>
                                <td>
                                <Button variant="danger"
                      id={item.product_id}
                      onClick={onAddcart}
                    >
                      Add To Cart
                    </Button>
</td>




                                    </tr>
                            );
                        })}

                        
                    </tbody>
 </Table>

</Container>
            </div>
             );
     

}

