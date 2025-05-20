import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Page404 = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-200 min-h-screen flex justify-center">
            <div className="w-[50%] mt-[5%]">
                <h1 className="text-4xl font-bold text-center mb-5">Error 404</h1>
                <div className="bg-white p-10 rounded-lg">
                    <p className="mb-5">
                        La página que estás buscando no existe o ha sido movida.
                    </p>
                    <div className="mt-10">
                        <Button
                            label="Volver a la página principal"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}