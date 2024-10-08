import * as constant from '../configs/actions';
import * as fetchApi from '../api/indexFetchDemo';

export default {
    fetchList: () => async(dispatch) => {
        const responseData = await fetchApi.fetchListData();
        dispatch({
            type: constant.FETCH_LIST,
            data: responseData,
        });
    },
};
