import React, {lazy} from 'react';

// Ожидать чего то прежде чeм отобразиться
export function withSuspenseHOK(WrappedComponent: React.ComponentType) {
    return (props: any) => {
        return <React.Suspense fallback={<div>loading...</div>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    };
};

export const withLazyHOK = (Component: React.ComponentType, adress: string) => {
    return (props: any) => {
        const Component = lazy(() => import (adress));
    };
};

