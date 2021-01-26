import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './home.css';

export default function Home() { 
    const [primaryReportsData, setPrimaryReportsData] = useState({ tests: [] });
    const history = useHistory(); 

    useEffect(() => {
            //we fetch the collection of total tests available and set in state
            fetch("http://localhost:8001/api/v1/diagnostics/tests")
            .then(response => response.json())
            .then(data => {
                setPrimaryReportsData(data);
            });
    }, []);

    //navigateTo helps to redirect to secondary testreport of the selected test
    function navigateTo(primarytest) { 
        return history.push('/testreport',primarytest);
    }

    //check the data records from the service and generate layout based on total primary tests
    return (
        <div className="testRuns">
            {primaryReportsData && primaryReportsData.tests.map(primarytest => { 
                return (
                    <Card text="white" className="text-center card" body onClick={() => navigateTo(primarytest)}>
                        <span>{primarytest.category}</span>
                    </Card>
                );
            })}
        </div>
    )
}