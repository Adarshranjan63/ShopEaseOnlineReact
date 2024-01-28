import { Alert, AlertTitle, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import OrderTracker from '../Order/OrderTracker';
import { updatePayment } from '../../../State/Payment/Action';
import { getOrderById } from '../../../State/Order/Action';
import AddressCard from '../Checkout/AdressCard';

const PaymentSuccess = () => {

  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const {orderId}=useParams();

  console.log("orderId",orderId)

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    //console.log("orderId",orderId)
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_link_id"));
    //setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    // if (paymentId && paymentStatus === "paid") {
      const data = { orderId, paymentId };
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
   // }
  }, [orderId, paymentId]);


  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
      </div>

      <OrderTracker activeStep={1}/>
            
      <Grid container className="space-y-5 py-5 pt-20">
        {[1,1,1].map((item)=><Grid  container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <Grid item xs={6}>

                    <div className="flex  items-center ">

                        <img className="w-[5rem] h-[5rem] object-cover object-top"src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/x/f/6/xxl-new-white-nofilter-original-imaghzggudfezpr8.jpeg?q=70" alt="" />


                        <div className="ml-5 space-y-2">
                            <p className="">item.product.title</p>
                         <div className="opacity-50 text-xs font-semibold space-x-5">
                            <span>Color :item.color</span>
                            <span>Size: item.size</span>
                         </div>
                        </div>
                        <p>Seller: item.product.brand</p>
                        <p>₹ item.price</p>

                    </div>

                </Grid>
                <Grid item>
                   <AddressCard address={''} />
               </Grid>

         </Grid>)
         }

      </Grid>
    </div>
  )
}

export default PaymentSuccess