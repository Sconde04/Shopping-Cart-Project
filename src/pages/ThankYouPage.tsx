import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const ThankYouPage = () => {
    const navigate = useNavigate();


    return (

        <div className="bg-gray-200 min-h-screen flex justify-center">
            <div className="w-[50%] mt-[5%]">
                <h1 className="text-4xl font-bold text-center mb-5">Thank You!</h1>
                <p className="text-gray-800 mb-8 text-center">Your order was completed successfuly.</p>
                <div className="bg-white p-10 rounded-lg">
                    <p className="mb-5">
                        An email receipt, including all details about your order, has been sent
                        to the email address you provided. Please keep it for your records
                    </p>

                    <p >
                        You can visit My Account page at any time to check the status of your
                        order. Or click here to <a href="#" className="text-gray-700 underline font-medium">print a copy of your receipt</a>
                    </p>

                    <div className="mt-10">
                        <Button
                            label="Go back to shop"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
            </div>
        </div>

    );

}






