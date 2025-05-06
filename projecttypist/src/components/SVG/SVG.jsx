
import React from "react";

function SVG(props) {

    const children = props.children;
    // console.log(props)

    const styledChild = React.cloneElement(children, {
        style: {
        //   ...(childern.props.style || {}),
          fill: props.color,
        },
    });

    return styledChild;
}

export default SVG;