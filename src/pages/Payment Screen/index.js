import { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Alert,
    CircularProgress,
} from "@mui/material";
import { FiCreditCard } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements , Elements} from "@stripe/react-stripe-js";


// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51R1PToP8FP4KADdgC5T5E0red3ToQAwvHCsC1gsyEAHlhLXwCNsh02QO2LZUbJMbSSdewDCh7qPzdJVpprlBOauL00xDGB02v2');

const PaymentScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState("basic");
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [paymentErrors, setPaymentErrors] = useState({});
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    // Mock plans data (ensure `features` is always an array)
    const plans = [
        { id: "basic", name: "Basic Plan", price: { monthly: "$9.99", yearly: "$99.99" }, features: ["Feature 1", "Feature 2", "Feature 3"] },
        { id: "pro", name: "Pro Plan", price: { monthly: "$19.99", yearly: "$199.99" }, features: ["All Basic Features", "Feature 4", "Feature 5", "Feature 6"] },
        { id: "premium", name: "Premium Plan", price: { monthly: "$29.99", yearly: "$299.99" }, features: ["All Pro Features", "Feature 7", "Feature 8", "Feature 9", "Priority Support"] },
    ];

    const handlePlanSelection = (planId) => {
        setSelectedPlan(planId);
    };

    const handleBillingCycleChange = (e) => {
        setBillingCycle(e.target.value);
    };

    const getCurrentPlanPrice = () => {
        const plan = plans.find((p) => p.id === selectedPlan);
        return plan ? plan.price[billingCycle] : "$0.00";
    };

    const validatePayment = () => {
        const errors = {};
        if (!stripe || !elements) return errors; // Stripe or Elements are not loaded yet

        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessingPayment(true);

        try {
            const cardNumberElement = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement = elements.getElement(CardCvcElement);

            // Create payment method with the elements
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
            });
            
            if (error) {
                alert(error.message);
                return;
            }

            // Simulate API call to process payment (replace with your backend call)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setPaymentSuccess(true);
        } catch (error) {
            alert("Payment failed. Please try again. ", error.message);
            console.log("Payment failed. Please try again. ", error.message);
        } 
    };

    return (
        <div className="right-content container-fluid overflow-auto" style={{ paddingTop: '70px' }}>
            <div className="card shadow border-0 p-3 mt-4">
                <Elements stripe={stripePromise}>
                    <h3 className="mb-4 hd">Billing & Plans</h3>
                    {paymentSuccess && (
                        <Alert severity="success" className="mb-4" onClose={() => setPaymentSuccess(false)}>
                            Payment successful! Your subscription has been updated to {plans.find((p) => p.id === selectedPlan)?.name}.
                        </Alert>
                    )}
                    <div className="row">
                        <div className="col-md-5">
                            <h4 className="mb-3 hd">Available Plans</h4>
                            {plans.map((plan) => (
                                <div className={`card shadow mb-3 ${selectedPlan === plan.id ? "border-primary" : ""}`}
                                    key={plan.id}
                                    style={{ backgroundColor: '#ebe9e9' }}
                                    onClick={() => handlePlanSelection(plan.id)}
                                    sx={{
                                        cursor: "pointer",
                                        border: selectedPlan === plan.id ? "2px solid #1976d2" : "1px solid #ddd",
                                    }}
                                >
                                    <p className=" mx-2 mt-2 mb-0 hd">{plan.name}</p>
                                    <p className=" mx-2 my-0 p-0 hd">{plan.price[billingCycle]} / ${billingCycle}</p>

                                    <div className="card-text mt-2 mx-4">
                                        <ul className="ps-3">
                                            {/* Ensure features are an array */}
                                            {(plan.features || []).map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment form on the right */}
                        <div className="col-md-7">
                            <h4 className="mb-3 hd">Payment Information</h4>
                            <div className="card shadow p-2" style={{ backgroundColor: '#ebe9e9' }}>
                                <form onSubmit={handlePayment}>
                                    <div className="row">
                                        {/* Email Address Field */}
                                        <div className="col-md-12 mb-3">
                                            <TextField
                                                label="Email Address"
                                                variant="outlined"
                                                fullWidth
                                                name="emailAddress"
                                                required
                                            />
                                        </div>

                                        {/* Card Number Field */}
                                        <div className="col-md-12 mb-3">
                                            <label>Card Number</label>
                                            <CardNumberElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            letterSpacing: '0.025em',
                                                            fontFamily: 'Arial, sans-serif',
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>

                                        {/* Expiration Date Field */}
                                        <div className="col-md-6 mb-3">
                                            <label>Expiration Date</label>
                                            <CardExpiryElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            letterSpacing: '0.025em',
                                                            fontFamily: 'Arial, sans-serif',
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>

                                        {/* CVC Field */}
                                        <div className="col-md-6 mb-3">
                                            <label>CVC</label>
                                            <CardCvcElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            letterSpacing: '0.025em',
                                                            fontFamily: 'Arial, sans-serif',
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="col-md-12">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                startIcon={isProcessingPayment ? <CircularProgress size={20} color="inherit" /> : <FiCreditCard />}
                                                fullWidth
                                                disabled={isProcessingPayment}
                                            >
                                                {isProcessingPayment ? "Processing..." : "Pay and Subscribe"}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentScreen;
