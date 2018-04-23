import React from 'react';
import { ToastContainer} from 'react-toastify';


/*Componente para mostrar mensajes de tipo toast, forma de usarlo:
 * Incluir el component <Toast />
 * toast.success('Loading...');
 */
class Toast extends React.Component {

    render() {
        return (
            <ToastContainer
                position="top-right"
                type="success"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        )
    }

}

export default Toast;