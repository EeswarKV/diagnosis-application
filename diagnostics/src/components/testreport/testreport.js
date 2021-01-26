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
    const TableHeaders = ["Test Name", "Description", "Action", "Result"]

    useEffect(() => {
        //set the tests informations recieved from params via history.push
        setTestsInfo(location.state);
    }, [location]);

    //returns the current date and time
    function getTimeandDate() { 
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        return dateTime;
    }

    //returns the post response after clicking the test button 
    //save the data inside localstorage 
    //record the time when test has been completed
    function runTest(currentTest) { 
        setReportTested(false);
        fetch(`http://localhost:8001/api/v1/diagnostics${currentTest.route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(postTestResponse => {
                currentTest.result = postTestResponse.result;
                currentTest.date = getTimeandDate();
                var testsFromLocalStorage = JSON.parse(localStorage.getItem("testshistory") || "[]");
                testsFromLocalStorage.push(currentTest);
                localStorage.setItem("testshistory", JSON.stringify(testsFromLocalStorage));
                setReportTested(true);
            })
    }

    // renders the table data 
    function renderTableData(testsInfo) { 
        return testsInfo?.tests.map(row =>{ 
            return (<Tr key={row.name}>
                <Td>{row.name}</Td>
                <Td>Generates the {row.name}</Td>
                <Td><Button onClick={() => runTest(row)}>Run Test</Button></Td>
                <Td>{reportTested && row.result ? row.result : '-'}</Td>
            </Tr>)
        })
    }
    
    // renders the table Headers from array constant
    function renderTableHeader() { 
        return (
            <Tr>
                {TableHeaders.map(header => {
                    return (<Th key={header}>{header}</Th>);
                })}
            </Tr>
        );
    }

return (
    <div>
        <p className="reportHeader">Quickly test your {location.state.category} report </p>
        <Table>
            <Thead>{renderTableHeader()}</Thead>
            <Tbody>{renderTableData(testsInfo)}</Tbody>
        </Table>
    </div>
    )
}