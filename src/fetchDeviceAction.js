import {FETCH_DEVICE} from './actionCreator';
import {db} from './config';

export default function fetchDevice(link) {
  return dispatch => {
      const value = [];
      db.ref("new_data").child(link+'').on('value', function(data) {
        data.forEach(f =>{
          value.push(f.key)
        })
        console.log(value);
        dispatch({
          type:FETCH_DEVICE,
          value:value
        })
      })

    }

}
