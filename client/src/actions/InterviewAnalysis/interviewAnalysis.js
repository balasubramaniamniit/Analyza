import * as api from '../../api';
import { JOIN_CALL, GET_INTERVIEW_ANALYSIS, STOP_ANALYSIS } from '../../constants/actionTypes';


export const joinZoomCall = (formData, history) => async (dispatch) => {
    try {
        console.log(formData)
        const { data } = await api.joinZoomCall(formData);
        console.log(data)
        dispatch({ type: JOIN_CALL, data });
        history.push('/interviewAnalysisResult')

    } catch (error) {
        console.log(error);
    }
}
