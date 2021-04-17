import axios from 'axios';

const instance=axios.create({
    baseURL:'https://job-tutor-default-rtdb.firebaseio.com/'
});

export default instance;