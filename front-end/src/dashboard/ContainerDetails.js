import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./ContainerDetails.css"
import Box from "@material-ui/core/Box";

export default function ContainerDetails() {
    const { jobUuid } = useParams();
    const [containers, setContainers] = useState([]);

    useEffect(() => {
        fetch(`/${jobUuid}/containers/`)
            .then(x => x.json())
            .then(x => setContainers(x))
            .catch(e => console.error(e));
    }, [jobUuid]);

    const runningContainers = containers.filter(({State}) => State === "running");
    const nonRunningContainers = containers.filter(({State}) => State !== "running");

    const status = <span className={nonRunningContainers.length > 0 ? "status-failure" : "status-success"}>
        <i className="feather icon-x-circle"/>&nbsp;{nonRunningContainers.length > 0 ? nonRunningContainers.length +" Errors" : "Success"}
    </span>

    const sections = [];
    if(nonRunningContainers.length > 0) {
        sections.push(<div className="section stopped-containers">
            <h5>Stopped</h5>
            <hr />
            <h3 className="status-subtext">{nonRunningContainers.length}</h3>
        </div>)
    }
    if(runningContainers.length > 0) {
        sections.push(<div className="section running-containers">
            <h5>Running</h5>
            <hr />
            <h3 className="status-subtext">{runningContainers.length}</h3>
        </div>)
    }

    return <Box display="flex" flexDirection="column" padding="30px">
        <Box display="flex" flexDirection="row">
            <h5>Docker Containers</h5>
            {status}
        </Box>
        <Box display="flex" borderRadius="25px">
            {sections}
        </Box>
    </Box>
}