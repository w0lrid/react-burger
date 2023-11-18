export const SHOW_FEED = 'SHOW_FEED';
export const CLOSE_FEED = 'CLOSE_FEED';

export const showFeed = (feed) => ({
    type: SHOW_FEED,
    feed,
})

export const closeFeed = () => ({
    type: CLOSE_FEED,
})