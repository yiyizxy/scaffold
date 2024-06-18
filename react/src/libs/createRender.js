import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './configureStore';

export default (Entry) => {
    return ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Entry />
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    );
};