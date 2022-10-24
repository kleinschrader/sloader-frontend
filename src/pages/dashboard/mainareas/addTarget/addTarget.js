import {ma_setto, selectMainArea} from './../../../../features/mainAreaState/mainAreaSlice.js';
import { useDispatch } from 'react-redux';

function AddTarget() {
    const dispatch = useDispatch();


    function handleSubmit(e) {
        e.preventDefault()
        dispatch(ma_setto('home'));
    }

    return (
        <div className="MainArea AddTarget">
            <form onSubmit={handleSubmit}>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default AddTarget;