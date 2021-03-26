import axios from 'axios';

const instance = axios.create({
    baseURL : "https://todo-react-fdb38-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;

