import {withRouter} from 'react-router'
import * as core from 'ak-lib-sys/Core'

export default withRouter((props) => {
    return <h1>
        <code>
            <pre>{core.json(props)}</pre>
        </code>
    </h1>
});