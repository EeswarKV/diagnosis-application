import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import './home.css';

export default function Home() { 
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({ tests: [] });
    const history = useHistory(); 

    useEffect(() => {
        let isSubscribed = true;
            fetch("http://localhost:8001/api/v1/diagnostics/tests")
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoaded(true);
                console.log("data", data);
            });
            return () => (isSubscribed = false)
    }, []);

    function navigateTo(testreport) { 
        return history.push('/testreport',testreport);
    }

    return (
        <div>
            {data && data.tests.map(test => { 
                return (
                    <>
                        <Card bg="secondary" text="white" className="text-center card" body onClick={ () => navigateTo(test)}><span>{test.category}</span></Card>
                    </>
                );
            })}
        </div>
    )
}