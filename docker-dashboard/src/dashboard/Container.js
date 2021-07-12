import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

function Container() {
    const [container, setContainer] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch("/container/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setContainer(result)
                }
            )
    }, [])

    return(
        <div>
            {id}
        </div>
    );
}

export default Container;