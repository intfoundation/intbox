import { createBrowserHistory } from 'history'

// Manually create the history object so we can access outside the Router e.g. in modals
const history = createBrowserHistory()
// const history = createBrowserHistory({forceRefresh: true})

export default history
