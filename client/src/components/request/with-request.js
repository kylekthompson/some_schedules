import Request from 'components/request/request';
import React from 'react';

export default function withRequest(requestProps, propName = 'request') {
  return function(Component) {
    function RequestComponent(props) {
      return (
        <Request {...requestProps}>
          {(renderProps) => {
            const namespacedRenderProps = {
              [propName]: renderProps,
            };

            return <Component {...props} {...namespacedRenderProps} />;
          }}
        </Request>
      );
    }

    const name = Component.displayName || Component.name || 'Component';
    RequestComponent.displayName = `withRequest(${name})`;

    return RequestComponent;
  };
}
