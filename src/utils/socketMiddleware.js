export const socketMiddleware = (url, actions) => {
    return (store) => {
        let socket = null;
        return (next) => {
            return (action) => {
                const { dispatch, getState } = store;
                const { type, payload } = action;
                const { wsInit, onOpen, onClose, onError, onOrders } = actions;
                const { user } = getState().user;
                if (type === wsInit) {
                    socket = new WebSocket(`${url}${type === wsInit && payload && user? `?token=${payload}` : '' }`);
                }
                if (socket) {
                    socket.onopen = (event) => {
                        dispatch({ type: onOpen })
                    };
                    socket.onerror = () => {
                        dispatch({ type: onError })
                    };
                    socket.onmessage = (event) => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
                        const { success } = parsedData;
                        success && dispatch({ type: onOrders, payload: parsedData });
                    };
                }
                if (socket && type === onClose) {
                    socket.close(1000);
                    socket.onclose = (event) => {
                        dispatch({ type: onClose })
                    }
                }
                next(action);
            }
        }
    }
}
