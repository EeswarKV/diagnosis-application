import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './testreport.css';

export default function TestReport() { 
    const location = useLocation();
    const [testsInfo, setTestsInfo] = useState({ tests: [] });
    const [reportTested, setReportTested] = useState(false);

    useEffect(() => {
        setTestsInfo(location.state);
    }, [location]);

    const TableHeaders = ["Test Name", "Description", "Action", "Result"]
    

    function runTest(contact) { 
        setReportTested(false);
        fetch(`http://localhost:8001/api/v1/diagnostics${contact.route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(data => {
                contact.result = data.result;
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;
                contact.date = dateTime;
                var users = JSON.parse(localStorage.getItem("users") || "[]");
                users.push(contact);
                localStorage.setItem("users", JSON.stringify(users));
                setReportTested(true);
            })
    }


    return (<div>
        <p class="reportHeader">Welcome to {location.state.category} report </p>
    <Table>
        <Thead>
                <Tr>
                    {TableHeaders.map(header => {
                        return (
                            <Th>{header}</Th>
                        );
                    })}
            </Tr>
        </Thead>
            <Tbody>
                {testsInfo && testsInfo.tests.map(row =>{ 
                    return (<Tr>
                        <Td>{row.name}</Td>
                        <Td></Td>
                        <Td><Button onClick={() => runTest(row)}>Run Test</Button></Td>
                        <Td>{reportTested ? row.result : '-'}</Td>
                    </Tr>)
                })}
        </Tbody>
        </Table>
    </div>)
}