import { SHOW_FEED, CLOSE_FEED } from "../actions/selectedFeed";

const initialState = {
    feed: null,
    opened: false,
}

export const selectedFeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_FEED: {
            return {
                feed: action.feed,
                opened: !state.opened,
            }
        }
        case CLOSE_FEED: {
            return {
                feed: null,
                opened: !state.opened,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}