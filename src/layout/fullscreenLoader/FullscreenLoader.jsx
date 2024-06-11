import React, {Fragment} from 'react';
import "./progress.css";
const FullscreenLoader = () => {
    return (
        <Fragment>
            <div className={"LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};
export default FullscreenLoader;