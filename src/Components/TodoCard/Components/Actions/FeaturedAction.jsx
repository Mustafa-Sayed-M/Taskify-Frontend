import React from 'react';
import ActionComponent from './Components/ActionComponent';

function FeaturedAction({ todoId, isFeatured }) {

    // Handle Featured
    const handleFeatured = () => {
        console.log('Handle Featured');
    };

    return (
        <ActionComponent
            text="Featured Todo"
            className="text-yellow-500"
            icon={`fa-${isFeatured ? 'solid' : 'regular'} fa-star fa-fw`}
            handleClick={handleFeatured}
            {...{
                'aria-label': "Featured Todo",
                title: 'Mark As Featured Todo',
                disabled: false
            }}
        />
    )
}

export default FeaturedAction;